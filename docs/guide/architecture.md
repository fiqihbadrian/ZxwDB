# Architecture

Learn how zxwdb is built and how the components work together.

## System Overview

```
┌─────────────────────────────────────────────────┐
│                   Browser                       │
│  ┌───────────────────────────────────────────┐  │
│  │         React Frontend (Vite)             │  │
│  │  - Canvas (ReactFlow)                     │  │
│  │  - State Management (Zustand)             │  │
│  │  - UI Components                          │  │
│  └─────────────────┬─────────────────────────┘  │
└────────────────────┼────────────────────────────┘
                     │ HTTP/REST
                     │ localhost:20256
┌────────────────────▼────────────────────────────┐
│              Backend Server                     │
│  ┌───────────────────────────────────────────┐  │
│  │       Express.js REST API                 │  │
│  │  - /api/connections                       │  │
│  │  - /api/tables                            │  │
│  │  - /api/query                             │  │
│  └─────────────────┬─────────────────────────┘  │
└────────────────────┼────────────────────────────┘
                     │ mysql2
                     │ port 3306
┌────────────────────▼────────────────────────────┐
│            MySQL/MariaDB                        │
│  - Schema Storage                               │
│  - Data Storage                                 │
│  - Relationship Enforcement                     │
└─────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend

**Core:**
- React 18 - UI framework
- Vite - Build tool & dev server
- ReactFlow - Canvas & node visualization

**State Management:**
- Zustand - Global state
- React Hooks - Local state

**Styling:**
- Tailwind CSS - Utility-first CSS
- Custom themes - Dark/Light mode

**Icons:**
- Lucide React - Icon library

### Backend

**Runtime:**
- Node.js 18+ - JavaScript runtime

**Framework:**
- Express.js - HTTP server
- CORS - Cross-origin support

**Database:**
- mysql2 - MySQL driver with promises
- Connection pooling

### Build & Dev

- Vite - Frontend bundling
- npm - Package management
- ESM - ES Modules

## Component Architecture

### Frontend Structure

```
frontend/
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Root component
│   ├── components/           # UI components
│   │   ├── Canvas.jsx        # Main canvas
│   │   ├── Sidebar.jsx       # Table list
│   │   ├── Toolbar.jsx       # Top toolbar
│   │   ├── TableNode.jsx     # Table card
│   │   ├── TableDetailsPanel.jsx
│   │   ├── ConnectionModal.jsx
│   │   ├── AddTableModal.jsx
│   │   ├── EditTableModal.jsx
│   │   ├── DataBrowser.jsx
│   │   ├── SQLEditor.jsx
│   │   └── ...
│   ├── stores/
│   │   └── appStore.js       # Zustand store
│   ├── styles/
│   │   ├── themes.js         # Theme definitions
│   │   └── index.css         # Global styles
│   └── utils/
│       └── api.js            # API calls
└── vite.config.js
```

### Backend Structure

```
backend/
├── src/
│   ├── index.js              # Server entry
│   ├── routes/
│   │   ├── connections.js    # DB connections
│   │   ├── tables.js         # Table CRUD
│   │   ├── columns.js        # Column CRUD
│   │   ├── relationships.js  # FK management
│   │   ├── data.js           # Data CRUD
│   │   └── query.js          # SQL execution
│   ├── db/
│   │   └── connection.js     # Connection pool
│   └── utils/
│       └── helpers.js        # Utilities
└── package.json
```

## Data Flow

### Creating a Table

```
User Action → Frontend Component → State Update → API Call
                                                      ↓
Backend Receives → Validate → Execute SQL → Update DB
                                                      ↓
Success Response ← Format Response ← Query Result ← DB
        ↓
Frontend Update → State Update → UI Re-render
```

**Detailed Flow:**

1. User clicks "Add Table" (Cmd+N)
2. `AddTableModal` component opens
3. User fills form and clicks "Create"
4. Form validation in component
5. `createTable()` calls API: `POST /api/tables`
6. Backend validates request
7. Backend executes `CREATE TABLE` SQL
8. MySQL creates table
9. Backend queries table structure
10. Backend returns table data
11. Frontend adds to `appStore.tables`
12. Canvas re-renders with new table
13. Success message shown

### Creating Relationship

```
Drag Handle → ReactFlow Edge → Frontend Validates → API Call
                                                        ↓
Backend → Create FK → ALTER TABLE → MySQL enforces
                                                        ↓
Success ← Return Edge Data ← Query FK Info ← DB
   ↓
Update State → Re-render Canvas with FK line
```

## State Management

### Zustand Store Structure

```javascript
{
  // Connection
  connectionId: null,
  databases: [],
  selectedDatabase: null,
  
  // Schema
  tables: [
    {
      id: 'table_1',
      name: 'users',
      columns: [...],
      foreignKeys: [...],
      position: { x: 100, y: 100 }
    }
  ],
  relationships: [...],
  
  // UI State
  selectedTable: null,
  theme: 'dark',
  
  // History
  history: [],
  historyIndex: 0,
  
  // Actions
  setTheme: (theme) => {...},
  createTable: (table) => {...},
  updateTable: (id, data) => {...},
  deleteTable: (id) => {...},
  undo: () => {...},
  redo: () => {...}
}
```

### State Updates

**Immutable Updates:**
```javascript
// Add table
set(state => ({
  tables: [...state.tables, newTable]
}))

// Update table
set(state => ({
  tables: state.tables.map(t => 
    t.id === id ? { ...t, ...updates } : t
  )
}))

// Delete table
set(state => ({
  tables: state.tables.filter(t => t.id !== id)
}))
```

## API Design

### RESTful Endpoints

```
POST   /api/connections/test          Test connection
POST   /api/connections/:id/connect   Connect to DB
GET    /api/databases/:id             List databases
POST   /api/databases                 Create database

GET    /api/tables/:connectionId      List tables
POST   /api/tables/:connectionId      Create table
PUT    /api/tables/:connectionId/:name Update table
DELETE /api/tables/:connectionId/:name Delete table

POST   /api/relationships/:connectionId Create FK
DELETE /api/relationships/:connectionId/:name Delete FK

GET    /api/data/:connectionId/:table  Get table data
POST   /api/data/:connectionId/:table  Insert row
PUT    /api/data/:connectionId/:table/:id Update row
DELETE /api/data/:connectionId/:table/:id Delete row

POST   /api/query/execute/:connectionId Execute SQL
```

### Request/Response Format

**Request:**
```json
{
  "tableName": "users",
  "columns": [
    {
      "name": "id",
      "type": "INT",
      "primaryKey": true,
      "autoIncrement": true
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Table created successfully",
  "data": {
    "table": {...}
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Table already exists",
  "code": "ER_TABLE_EXISTS_ERROR"
}
```

## Database Schema

### Information Schema Queries

zxwdb uses MySQL Information Schema:

```sql
-- Get tables
SELECT TABLE_NAME, TABLE_TYPE
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = ?

-- Get columns
SELECT 
  COLUMN_NAME, 
  DATA_TYPE,
  COLUMN_TYPE,
  IS_NULLABLE,
  COLUMN_KEY,
  EXTRA
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?

-- Get foreign keys
SELECT 
  CONSTRAINT_NAME,
  COLUMN_NAME,
  REFERENCED_TABLE_NAME,
  REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = ? 
  AND TABLE_NAME = ?
  AND REFERENCED_TABLE_NAME IS NOT NULL
```

## Performance Optimizations

### Frontend

1. **React.memo**: Prevent unnecessary re-renders
2. **Lazy Loading**: Code splitting for modals
3. **Virtual Scrolling**: Large table lists
4. **Debounced Search**: Reduce API calls
5. **Optimistic Updates**: Instant UI feedback

### Backend

1. **Connection Pooling**: Reuse DB connections
2. **Prepared Statements**: SQL injection prevention + speed
3. **Result Limiting**: Paginate large results
4. **Index Hints**: Optimize queries
5. **Batch Operations**: Multiple inserts in one query

### Network

1. **Request Batching**: Combine API calls
2. **Gzip Compression**: Reduce payload size
3. **HTTP/2**: Multiplexing
4. **Caching**: Browser + service worker (future)

## Security

### Input Validation

```javascript
// Backend validation
const validateTableName = (name) => {
  if (!name || typeof name !== 'string') {
    throw new Error('Invalid table name')
  }
  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    throw new Error('Table name must be alphanumeric')
  }
  return true
}
```

### SQL Injection Prevention

```javascript
// ❌ NEVER do this
const sql = `SELECT * FROM ${tableName}`

// ✅ Always use placeholders
const sql = 'SELECT * FROM ??'
db.query(sql, [tableName])
```

### Authentication (Future)

```javascript
// JWT-based auth (planned)
const token = jwt.sign({ userId: 1 }, SECRET)
res.header('Authorization', `Bearer ${token}`)
```

## Deployment Architecture

### Single Server

```
User → Browser → zxwdb:20256 → MySQL:3306
                 (same machine)
```

### Reverse Proxy

```
User → Nginx:80 → zxwdb:20256 → MySQL:3306
       (proxy)     (backend)
```

### Docker

```
User → Container:zxwdb → Container:mysql
       (network bridge)
```

## Monitoring & Logging

### Console Logging

```javascript
console.log('[zxwdb] Server started on port 20256')
console.error('[zxwdb] Database connection failed:', error)
```

### SQL Query Logging

```javascript
db.on('query', (sql) => {
  console.log('[SQL]', sql)
})
```

### Performance Metrics (Future)

- Request latency
- Query execution time
- Memory usage
- Connection pool stats

## Next Steps

- [Configuration →](/guide/configuration)
- [Theme System →](/guide/theme-system)
- [API Reference →](/api/cli)
