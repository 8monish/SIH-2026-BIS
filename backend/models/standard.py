from pydantic import BaseModel, Field

from models.common import PyObjectId


class Standard(BaseModel):
    id: PyObjectId | None = Field(default=None, alias="_id")
    standard_number: str
    title: str
    product_category: str
    certification_required: bool = True
    pdf_file: str | None = None

    model_config = {"populate_by_name": True}
