import os
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from config import settings
from database import get_database
from models.common import mongo_doc_to_json

router = APIRouter(prefix="/api/documents", tags=["documents"])

ALLOWED_EXTENSIONS = {".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"}


@router.post("")
async def upload_document(
    file: UploadFile = File(...),
    product: str = Form(...),
    document_type: str = Form("Other"),
):
    ext = os.path.splitext(file.filename or "")[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type '{ext}'. Allowed: {sorted(ALLOWED_EXTENSIONS)}",
        )

    os.makedirs(settings.upload_dir, exist_ok=True)

    doc_id = uuid.uuid4().hex
    stored_filename = f"{doc_id}{ext}"
    stored_path = os.path.join(settings.upload_dir, stored_filename)

    contents = await file.read()
    with open(stored_path, "wb") as f:
        f.write(contents)

    db = get_database()
    metadata = {
        "filename": file.filename,
        "stored_path": stored_path,
        "product": product,
        "document_type": document_type,
        "content_type": file.content_type,
        "size_bytes": len(contents),
        "uploaded_at": datetime.now(timezone.utc).date().isoformat(),
    }
    result = await db.documents.insert_one(metadata)
    saved = await db.documents.find_one({"_id": result.inserted_id})

    # NOTE: this is the hand-off point to the AI/gap-analysis module, once
    # your teammate is ready to consume uploaded documents. For the MVP we
    # just persist metadata + file path here.

    return mongo_doc_to_json(saved)


@router.get("")
async def list_documents(product: str | None = None):
    db = get_database()
    query = {"product": product} if product else {}
    cursor = db.documents.find(query)
    return [mongo_doc_to_json(doc) async for doc in cursor]
