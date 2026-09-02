from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database import close_mongo_connection, connect_to_mongo, seed_demo_data
from routes import documents, roadmap, standards


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    await seed_demo_data()
    yield
    await close_mongo_connection()


app = FastAPI(
    title="BIS Compliance Assistant API",
    description="Backend + Database layer: products, standards, roadmaps, documents.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(roadmap.router)
app.include_router(standards.router)
app.include_router(documents.router)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/")
async def root():
    return {
        "message": "BIS Compliance Assistant API",
        "docs": "/docs",
        "endpoints": [
            "POST /api/roadmap",
            "GET /api/roadmap/{id}",
            "GET /api/roadmap",
            "PATCH /api/roadmap/{id}/task",
            "GET /api/standards",
            "GET /api/products",
            "POST /api/documents",
            "GET /api/documents",
        ],
    }
