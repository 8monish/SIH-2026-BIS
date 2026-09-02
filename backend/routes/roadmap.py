from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase

from database import get_database
from models.common import mongo_doc_to_json, to_object_id
from models.roadmap import RoadmapCreateRequest, TaskUpdateRequest
from services.ai_service import call_ai_module

router = APIRouter(prefix="/api/roadmap", tags=["roadmap"])


def _calc_progress(steps: list[dict]) -> int:
    if not steps:
        return 0
    completed = sum(1 for s in steps if s.get("completed"))
    return round((completed / len(steps)) * 100)


@router.post("")
async def create_roadmap(payload: RoadmapCreateRequest):
    """
    Request  -> Validate input -> Find product -> Find applicable BIS standard
             -> Send to AI module -> Receive roadmap JSON -> Save in MongoDB
             -> Return roadmap to frontend
    """
    db: AsyncIOMotorDatabase = get_database()

    # 1. Find the product
    product = await db.products.find_one({"name": payload.product_name})
    if not product:
        raise HTTPException(
            status_code=404,
            detail=f"Unknown product '{payload.product_name}'. "
            f"Available products can be listed via GET /api/standards or your products list.",
        )

    # 2. Find the applicable standard
    standard_ids = product.get("standard_ids", [])
    if not standard_ids:
        raise HTTPException(status_code=422, detail="Product has no linked BIS standard.")

    standard_doc = await db.standards.find_one({"standard_number": standard_ids[0]})
    if not standard_doc:
        raise HTTPException(status_code=422, detail="Linked standard not found in database.")

    standard_ref = {"number": standard_doc["standard_number"], "title": standard_doc["title"]}

    # 3. Send to AI module, get back structured roadmap JSON
    ai_result = await call_ai_module(
        product_name=payload.product_name,
        description=payload.description,
        specifications=payload.specifications,
        standard=standard_ref,
    )

    # 4. Normalize steps (give each an id if the AI module didn't supply one)
    steps = []
    for i, step in enumerate(ai_result.get("steps", []), start=1):
        steps.append(
            {
                "id": step.get("id") or f"step{i}",
                "title": step["title"],
                "completed": bool(step.get("completed", False)),
            }
        )

    roadmap_doc = {
        "product_name": payload.product_name,
        "description": payload.description,
        "specifications": payload.specifications,
        "standard": ai_result.get("standard", standard_ref),
        "certification": ai_result.get("certification", {"required": True}),
        "tests": ai_result.get("tests", []),
        "documents": ai_result.get("documents", []),
        "steps": steps,
        "progress": _calc_progress(steps),
    }

    # 5. Save roadmap in MongoDB
    result = await db.roadmaps.insert_one(roadmap_doc)
    saved = await db.roadmaps.find_one({"_id": result.inserted_id})

    # 6. Return roadmap to frontend
    return mongo_doc_to_json(saved)


@router.get("/{roadmap_id}")
async def get_roadmap(roadmap_id: str):
    db = get_database()
    try:
        oid = to_object_id(roadmap_id)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    roadmap = await db.roadmaps.find_one({"_id": oid})
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")

    return mongo_doc_to_json(roadmap)


@router.get("")
async def list_roadmaps(product_name: str | None = None):
    """Lets the frontend show roadmap/project history."""
    db = get_database()
    query = {"product_name": product_name} if product_name else {}
    cursor = db.roadmaps.find(query).sort("_id", -1)
    return [mongo_doc_to_json(doc) async for doc in cursor]


@router.patch("/{roadmap_id}/task")
async def update_task(roadmap_id: str, payload: TaskUpdateRequest):
    db = get_database()
    try:
        oid = to_object_id(roadmap_id)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    roadmap = await db.roadmaps.find_one({"_id": oid})
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")

    steps = roadmap.get("steps", [])
    matched = False
    for step in steps:
        if step["id"] == payload.task_id:
            step["completed"] = payload.completed
            matched = True
            break

    if not matched:
        raise HTTPException(status_code=404, detail=f"Task '{payload.task_id}' not found on this roadmap")

    progress = _calc_progress(steps)

    await db.roadmaps.update_one(
        {"_id": oid},
        {"$set": {"steps": steps, "progress": progress}},
    )

    return {"roadmap_id": roadmap_id, "steps": steps, "progress": progress}
