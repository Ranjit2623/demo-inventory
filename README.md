# Demo Inventory Service

Inventory management service for items, SKU tracking, and stock adjustments.

- **Port**: `3002`
- **Database**: `inventory_db` (MySQL)
- **Primary Entity**: `InventoryItem`

## CI/CD
GitHub Actions workflow configured in `.github/workflows/ci.yml` triggers on pushes and PRs to branches:
- `ranjit`
- `master`
- `dev`

## Endpoints
- `GET /health` - Health status
- `POST /inventory` - Create inventory item
- `GET /inventory` - List inventory items
- `GET /inventory/:id` - Get inventory item by ID
- `PATCH /inventory/:id/stock` - Adjust stock quantity (`quantityDelta`: +/-)

## Setup & Running
```bash
npm install
npm run build
npm run start:dev
```
