from datetime import date, datetime, timezone

from pydantic import BaseModel, Field

from models.common import PyObjectId


# ---------- Incoming request from the frontend ----------

class RoadmapCreateRequest(BaseModel):
    product_name: str
    description: str = ""
    specifications: dict = Field(default_factory=dict)


class TaskUpdateRequest(BaseModel):
    task_id: str
    completed: bool


# ---------- Pieces of a roadmap (shape matches the AI module's JSON contract) ----------

class StandardRef(BaseModel):
    number: str
    title: str


class Certification(BaseModel):
    required: bool = True
    scheme: str | None = None


class TestItem(BaseModel):
    name: str
    required: bool = True
    source_page: int | None = None
    source_section: str | None = None


class Step(BaseModel):
    id: str
    title: str
    completed: bool = False


# ---------- Stored roadmap document ----------

class Roadmap(BaseModel):
    id: PyObjectId | None = Field(default=None, alias="_id")
    product_name: str
    description: str = ""
    specifications: dict = Field(default_factory=dict)

    standard: StandardRef
    certification: Certification
    tests: list[TestItem] = Field(default_factory=list)
    documents: list[str] = Field(default_factory=list)
    steps: list[Step] = Field(default_factory=list)

    progress: int = 0
    created_at: date = Field(default_factory=lambda: datetime.now(timezone.utc).date())

    model_config = {"populate_by_name": True}
