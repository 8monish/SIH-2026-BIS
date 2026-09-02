from fastapi import APIRouter

from database import get_database
from models.common import mongo_doc_to_json

router = APIRouter(tags=["standards"])


@router.get("/api/standards")
async def list_standards():
    db = get_database()
    cursor = db.standards.find({})
    return [mongo_doc_to_json(doc) async for doc in cursor]


@router.get("/api/products")
async def list_products():
    """Handy for populating a product dropdown on the frontend."""
    db = get_database()
    cursor = db.products.find({})
    return [mongo_doc_to_json(doc) async for doc in cursor]
