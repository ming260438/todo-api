# Todo API

REST API for a To-do List built with **Node.js + TypeScript + Express**. Data is stored in-memory — no database required.

## Tech Stack

- Node.js
- TypeScript
- Express
- uuid (v4 ID generation)
- dotenv (environment variable loading)

## Prerequisites

- Node.js 18+
- npm

## Environment Variables

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Default environment values:

```env
PORT=3000
NODE_ENV=development
APP_NAME=Todo API
APP_VERSION=1.0.0
```

## Getting Started

```bash
cd todo-api
npm install
npm run dev      # development (hot-reload)
npm run build    # compile to dist/
npm start        # run compiled output
```

The server starts on **http://localhost:3000** (override with `PORT` env var).

## Project Structure

```text
todo-api/
  .env
  .env.example
  .gitignore
  package.json
  tsconfig.json
  README.md
  src/
    index.ts
    controllers/
      todosController.ts
    models/
      todo.ts
    routes/
      todos.ts
    store/
      todosStore.ts
```

- `src/index.ts`: app bootstrap, middleware, and route mounting.
- `src/routes/todos.ts`: REST endpoint definitions.
- `src/controllers/todosController.ts`: request validation and response handling.
- `src/store/todosStore.ts`: in-memory data operations (no database).
- `src/models/todo.ts`: todo type/interface definition.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | API health/info |
| GET | `/todos` | List all todos |
| GET | `/todos/:id` | Get a single todo |
| POST | `/todos` | Create a todo `{ "title": "..." }` |
| PUT | `/todos/:id` | Update todo `{ "title": "...", "completed": true }` |
| PATCH | `/todos/:id/toggle` | Toggle `completed` flag |
| DELETE | `/todos/:id` | Delete a todo |

## Todo Schema

```json
{
  "id": "uuid",
  "title": "Buy groceries",
  "completed": false,
  "createdAt": "2026-05-21T10:00:00.000Z"
}
```

## Validation and Status Codes

- `POST /todos` returns `400` when `title` is missing or empty.
- `PUT /todos/:id` returns `400` when `title` is invalid or `completed` is not boolean.
- `GET/PUT/PATCH/DELETE /todos/:id` return `404` when todo is not found.
- `POST /todos` returns `201` when created.
- `DELETE /todos/:id` returns `204` when deleted.

## Response Examples

### GET /

Status: `200 OK`

```json
{
  "message": "Todo API is running",
  "version": "1.0.0"
}
```

### GET /todos

Status: `200 OK`

```json
[
  {
    "id": "a6b38ff2-52f7-4a3f-95db-301593ec6675",
    "title": "Buy groceries",
    "completed": false,
    "createdAt": "2026-05-21T10:00:00.000Z"
  }
]
```

### GET /todos/:id

Status: `200 OK`

```json
{
  "id": "a6b38ff2-52f7-4a3f-95db-301593ec6675",
  "title": "Buy groceries",
  "completed": false,
  "createdAt": "2026-05-21T10:00:00.000Z"
}
```

Not found (`404 Not Found`):

```json
{
  "message": "Todo not found"
}
```

### POST /todos

Status: `201 Created`

```json
{
  "id": "a6b38ff2-52f7-4a3f-95db-301593ec6675",
  "title": "Buy groceries",
  "completed": false,
  "createdAt": "2026-05-21T10:00:00.000Z"
}
```

Validation error (`400 Bad Request`):

```json
{
  "message": "title is required and must be a non-empty string"
}
```

### PUT /todos/:id

Status: `200 OK`

```json
{
  "id": "a6b38ff2-52f7-4a3f-95db-301593ec6675",
  "title": "Updated task",
  "completed": true,
  "createdAt": "2026-05-21T10:00:00.000Z"
}
```

Validation error (`400 Bad Request`):

```json
{
  "message": "completed must be a boolean"
}
```

### PATCH /todos/:id/toggle

Status: `200 OK`

```json
{
  "id": "a6b38ff2-52f7-4a3f-95db-301593ec6675",
  "title": "Updated task",
  "completed": false,
  "createdAt": "2026-05-21T10:00:00.000Z"
}
```

### DELETE /todos/:id

Status: `204 No Content`

Response body:

```text
(empty)
```

## Example

```bash
# Create
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries"}'

# List
curl http://localhost:3000/todos

# Toggle
curl -X PATCH http://localhost:3000/todos/<id>/toggle

# Update
curl -X PUT http://localhost:3000/todos/<id> \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated task", "completed": true}'

# Delete
curl -X DELETE http://localhost:3000/todos/<id>
```

## Notes

- All data lives in memory and resets when the server restarts.
- IDs are generated with `uuid v4`.
- This project intentionally does not connect to any database (per exam requirement).
