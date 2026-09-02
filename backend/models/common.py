"""
Shared helpers for turning MongoDB ObjectId <-> JSON-friendly strings.
"""
from typing import Annotated, Any

from bson import ObjectId
from pydantic import BeforeValidator

PyObjectId = Annotated[str, BeforeValidator(str)]


def to_object_id(id_str: str) -> ObjectId:
    if not ObjectId.is_valid(id_str):
        raise ValueError(f"'{id_str}' is not a valid ObjectId")
    return ObjectId(id_str)


def mongo_doc_to_json(doc: dict[str, Any]) -> dict[str, Any]:
    """Convert a raw Mongo document (with _id: ObjectId) into a JSON-safe dict
    with an 'id' string field."""
    if doc is None:
        return doc
    doc = dict(doc)
    if "_id" in doc:
        doc["id"] = str(doc.pop("_id"))
    return doc
