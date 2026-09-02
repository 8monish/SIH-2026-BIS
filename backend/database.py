"""
MongoDB connectivity.

Exposes:
- connect_to_mongo() / close_mongo_connection()  -> called on FastAPI startup/shutdown
- get_database()                                  -> returns the active AsyncIOMotorDatabase
- seed_demo_data()                                -> inserts demo products + standards if empty
"""
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from config import settings


class Mongo:
    client: AsyncIOMotorClient | None = None
    db: AsyncIOMotorDatabase | None = None


mongo = Mongo()


async def connect_to_mongo() -> None:
    mongo.client = AsyncIOMotorClient(settings.mongo_uri)
    mongo.db = mongo.client[settings.mongo_db_name]
    # Fail fast with a clear error if MongoDB is unreachable.
    await mongo.client.admin.command("ping")

    # Helpful indexes
    await mongo.db.products.create_index("name", unique=True)
    await mongo.db.standards.create_index("standard_number", unique=True)
    await mongo.db.roadmaps.create_index("product_name")
    await mongo.db.documents.create_index("product")


async def close_mongo_connection() -> None:
    if mongo.client:
        mongo.client.close()


def get_database() -> AsyncIOMotorDatabase:
    if mongo.db is None:
        raise RuntimeError("Database not initialized. Did startup run?")
    return mongo.db


DEMO_PRODUCTS = [
    {
        "name": "Pressure Cooker",
        "category": "Kitchen Appliance",
        "standard_ids": ["IS 2347"],
    },
    {
        "name": "LED Lamp",
        "category": "Electrical",
        "standard_ids": ["IS 16102"],
    },
    {
        "name": "Electric Immersion Water Heater",
        "category": "Electrical Appliance",
        "standard_ids": ["IS 4159"],
    },
    {
        "name": "Toys (Non-Electric)",
        "category": "Toys",
        "standard_ids": ["IS 9873"],
    },
    {
        "name": "Packaged Drinking Water",
        "category": "Food & Beverage",
        "standard_ids": ["IS 14543"],
    },
]

DEMO_STANDARDS = [
    {
        "standard_number": "IS 2347",
        "title": "Pressure Cookers - Specification",
        "product_category": "Kitchen Appliance",
        "certification_required": True,
        "pdf_file": "IS_2347.pdf",
    },
    {
        "standard_number": "IS 16102",
        "title": "Self-Ballasted LED Lamps - Safety Requirements",
        "product_category": "Electrical",
        "certification_required": True,
        "pdf_file": "IS_16102.pdf",
    },
    {
        "standard_number": "IS 4159",
        "title": "Electric Immersion Water Heaters - Specification",
        "product_category": "Electrical Appliance",
        "certification_required": True,
        "pdf_file": "IS_4159.pdf",
    },
    {
        "standard_number": "IS 9873",
        "title": "Safety of Toys",
        "product_category": "Toys",
        "certification_required": True,
        "pdf_file": "IS_9873.pdf",
    },
    {
        "standard_number": "IS 14543",
        "title": "Packaged Drinking Water - Specification",
        "product_category": "Food & Beverage",
        "certification_required": True,
        "pdf_file": "IS_14543.pdf",
    },
]


async def seed_demo_data() -> None:
    """Insert demo products/standards only if the collections are empty.
    Safe to call on every startup."""
    db = get_database()

    if await db.products.count_documents({}) == 0:
        await db.products.insert_many(DEMO_PRODUCTS)

    if await db.standards.count_documents({}) == 0:
        await db.standards.insert_many(DEMO_STANDARDS)
