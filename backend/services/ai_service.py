"""
This is the ONLY file that talks to your teammate's AI/RAG module.

Contract (agree this with your teammate):

  Backend sends (POST {AI_SERVICE_URL}):
    {
      "product_name": "Pressure Cooker",
      "description": "5 litre aluminium household pressure cooker",
      "specifications": {"capacity": "5L", "material": "Aluminium"},
      "standard": {"number": "IS 2347", "title": "Pressure Cookers"}
    }

  AI module responds with:
    {
      "standard": {"number": "IS 2347", "title": "Pressure Cookers"},
      "certification": {"required": true, "scheme": "Product Certification"},
      "tests": [
        {"name": "Safety Test", "required": true, "source_page": 12, "source_section": "5.2"}
      ],
      "documents": ["Product specification", "Test report"],
      "steps": [
        {"title": "Identify applicable standard", "completed": false},
        {"title": "Perform required tests", "completed": false},
        {"title": "Prepare documentation", "completed": false},
        {"title": "Submit application", "completed": false}
      ]
    }

If AI_SERVICE_URL is not configured (or the call fails), a deterministic mock
roadmap is returned instead so the backend + frontend can be built and demoed
without waiting on the AI module to be ready.
"""
import httpx

from config import settings


async def call_ai_module(
    product_name: str,
    description: str,
    specifications: dict,
    standard: dict,
) -> dict:
    payload = {
        "product_name": product_name,
        "description": description,
        "specifications": specifications,
        "standard": standard,
    }

    if settings.ai_service_url:
        try:
            async with httpx.AsyncClient(timeout=settings.ai_service_timeout_seconds) as client:
                response = await client.post(settings.ai_service_url, json=payload)
                response.raise_for_status()
                return response.json()
        except (httpx.HTTPError, ValueError) as exc:
            # Don't take down the whole request just because the AI module is
            # unreachable mid-development -- fall back to the mock so the
            # rest of the flow (DB save, progress calc, retrieval) still works.
            print(f"[ai_service] AI module call failed ({exc}); using mock roadmap.")

    return _mock_roadmap(standard)


def _mock_roadmap(standard: dict) -> dict:
    """Deterministic placeholder roadmap, used until the AI module is wired up."""
    return {
        "standard": standard,
        "certification": {
            "required": True,
            "scheme": "Product Certification",
        },
        "tests": [
            {
                "name": "Safety Test",
                "required": True,
                "source_page": None,
                "source_section": None,
            }
        ],
        "documents": [
            "Product specification",
            "Test report",
        ],
        "steps": [
            {"title": "Identify applicable standard", "completed": False},
            {"title": "Perform required tests", "completed": False},
            {"title": "Prepare documentation", "completed": False},
            {"title": "Submit application", "completed": False},
        ],
    }
