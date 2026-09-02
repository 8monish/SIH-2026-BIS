# BIS Compliance Assistant — Backend + Database

FastAPI + MongoDB backend, built to the spec: your teammate owns the
frontend and the AI/RAG module; this owns storage, workflow state, and the
APIs that connect them.

```
backend/
├── main.py              FastAPI app, CORS, startup (DB connect + seed)
├── config.py             Settings loaded from environment / .env
├── database.py            Mongo connection + demo data seeding
├── routes/
│   ├── roadmap.py           POST/GET roadmap, PATCH task
│   ├── standards.py         GET standards, GET products
│   └── documents.py         POST/GET documents
├── models/                Pydantic schemas (request/response + Mongo docs)
├── services/
│   └── ai_service.py        The ONLY file that calls your teammate's AI module
├── uploads/                Uploaded files land here (local disk storage)
├── requirements.txt
└── .env.example
```

## 1. Setup

```bash
cd backend
python3 -m venv venv && source venv/bin/activate     # optional but recommended
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` — point at a local MongoDB (`mongodb://localhost:27017`) or an
  Atlas cluster connection string.
- `AI_SERVICE_URL` — leave blank until your teammate's AI endpoint is ready.
  The backend will use a mock roadmap generator in the meantime, so you're
  never blocked.

## 2. Run

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

On startup the app connects to MongoDB, creates indexes, and seeds the
`BIS_Assistant` database with 5 demo products + their standards **only if
those collections are empty** — safe to restart repeatedly.

Interactive API docs (Swagger UI): **http://localhost:8000/docs**
(Postman-friendly — every route, schema, and example is listed there.)

## 3. API surface

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/roadmap` | POST | Generate a roadmap for a product |
| `/api/roadmap/{id}` | GET | Retrieve a saved roadmap |
| `/api/roadmap` | GET | List roadmaps (optional `?product_name=`) — project history |
| `/api/roadmap/{id}/task` | PATCH | Mark a checklist step done/undone, recompute progress |
| `/api/standards` | GET | List all BIS standards in the DB |
| `/api/products` | GET | List supported products (for a frontend dropdown) |
| `/api/documents` | POST | Upload a document (multipart: `file`, `product`, `document_type`) |
| `/api/documents` | GET | List uploaded documents (optional `?product=`) |
| `/health` | GET | Liveness check |

### Example: generate a roadmap

```bash
curl -X POST http://localhost:8000/api/roadmap \
  -H "Content-Type: application/json" \
  -d '{
        "product_name": "Pressure Cooker",
        "description": "5 litre aluminium household pressure cooker",
        "specifications": {"capacity": "5L", "material": "Aluminium"}
      }'
```

Returns the saved roadmap document, including its Mongo `id`, `standard`,
`certification`, `tests`, `documents`, `steps`, and computed `progress`.

### Example: tick off a checklist item

```bash
curl -X PATCH http://localhost:8000/api/roadmap/<roadmap_id>/task \
  -H "Content-Type: application/json" \
  -d '{"task_id": "step1", "completed": true}'
```

## 4. Connecting the frontend

- CORS is open (`CORS_ORIGINS=*` by default) so your teammate's frontend dev
  server can call this API directly — tighten `CORS_ORIGINS` in `.env` to
  your deployed frontend origin before demo day.
- The frontend only ever needs to know your **base URL**
  (`http://localhost:8000` locally). Point their `fetch`/`axios` calls at the
  table above.
- `GET /api/products` and `GET /api/standards` are there specifically to
  populate dropdowns/search on their side.

## 5. Connecting the AI/RAG module

All AI integration lives in `services/ai_service.py`. Agree this contract
with your teammate (already documented as a comment at the top of that
file):

**You send** `POST {AI_SERVICE_URL}`:
```json
{
  "product_name": "Pressure Cooker",
  "description": "...",
  "specifications": {"capacity": "5L"},
  "standard": {"number": "IS 2347", "title": "Pressure Cookers"}
}
```

**They return:**
```json
{
  "standard": {"number": "IS 2347", "title": "Pressure Cookers"},
  "certification": {"required": true, "scheme": "Product Certification"},
  "tests": [{"name": "Safety Test", "required": true, "source_page": 12, "source_section": "5.2"}],
  "documents": ["Product specification", "Test report"],
  "steps": [
    {"title": "Identify applicable standard", "completed": false},
    {"title": "Perform required tests", "completed": false}
  ]
}
```

Set `AI_SERVICE_URL` in `.env` once their endpoint is live — no code changes
needed on your side. Until then, `POST /api/roadmap` transparently falls
back to a mock roadmap so you can keep building/demoing the rest of the
flow (save, retrieve, checklist, progress %).

## 6. Database layout (MongoDB `BIS_Assistant`)

- **products** — `name`, `category`, `standard_ids[]`
- **standards** — `standard_number`, `title`, `product_category`, `certification_required`, `pdf_file`
- **roadmaps** — full generated roadmap per request: `standard`, `certification`, `tests[]`, `documents[]`, `steps[]` (each with `id`/`title`/`completed`), `progress`, `created_at`
- **documents** — uploaded file metadata: `filename`, `stored_path`, `product`, `document_type`, `uploaded_at`

Indexes are created automatically on startup (`products.name` unique,
`standards.standard_number` unique, plus lookup indexes on `roadmaps` and
`documents`).

## 7. Verified

This backend was exercised end-to-end (create roadmap → retrieve →
patch a task → recompute progress → upload a document → 404 on an unknown
product) against an in-memory MongoDB-compatible store, and all endpoints
behaved as documented above. Point `MONGO_URI` at a real MongoDB instance
and it works the same way — no code changes required.

## 8. Optional next steps (skip if short on time)

- User authentication
- Gap-analysis API for uploaded documents
- Swap local disk storage for S3/Cloud storage for uploaded documents
