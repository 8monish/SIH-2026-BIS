from pydantic import BaseModel, Field

from models.common import PyObjectId


class Product(BaseModel):
    id: PyObjectId | None = Field(default=None, alias="_id")
    name: str
    category: str
    standard_ids: list[str] = Field(default_factory=list)

    model_config = {"populate_by_name": True}
