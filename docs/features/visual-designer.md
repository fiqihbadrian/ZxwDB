# Visual Designer

The visual designer is the heart of zxwdb. Design database schemas with an intuitive drag-and-drop interface.

## Canvas Overview

### Main Components

```
┌─────────────────────────────────────────────────┐
│  [+ Add Table] [Browse] [Preview SQL] [☀️]     │ ← Toolbar
├─────────────────────────────────────────────────┤
│ Tables    │                                      │
│ ──────    │         Canvas Area                  │
│ □ users   │    ┌──────────────┐                 │
│ □ posts   │    │ users        │                 │
│ □ comments│    ├──────────────┤                 │
│           │    │ ○ id         │                 │
│           │    │ ○ username   │───┐             │
│           │    │ ○ email      │   │             │
│           │    └──────────────┘   │ N:1         │
│           │                        │             │
│ Sidebar   │    ┌──────────────┐   │             │
│           │    │ posts        │   │             │
│           │    ├──────────────┤   │             │
│           │    │ ○ id         │   │             │
│           │    │ ● user_id    │←──┘             │
│           │    │ ○ title      │                 │
│           │    │ ○ content    │                 │
│           │    └──────────────┘                 │
└───────────┴──────────────────────────────────────┘
```

### Interface Elements

- **Toolbar**: Top bar with action buttons
- **Sidebar**: Left panel showing table list
- **Canvas**: Main workspace for designing
- **Table Nodes**: Visual representation of tables
- **Relationship Lines**: Connections between tables
- **Mini Map**: Bottom-right navigation helper

## Creating Tables

### Method 1: Add Table Button

1. Click **"+ Add Table"** in toolbar
2. Fill in the form:
   - Table name
   - Columns (name, type, length, constraints)
3. Click **"Create Table"**

### Method 2: Keyboard Shortcut

```
macOS:          Cmd+N
Windows/Linux:  Ctrl+N
```

### Table Configuration

```
Table Name: users

Columns:
┌─────────────┬──────────┬────────┬────────────────────┐
│ Name        │ Type     │ Length │ Constraints        │
├─────────────┼──────────┼────────┼────────────────────┤
│ id          │ INT      │        │ PK, AUTO_INCREMENT │
│ username    │ VARCHAR  │ 50     │ NOT NULL           │
│ email       │ VARCHAR  │ 100    │ NOT NULL           │
│ password    │ VARCHAR  │ 255    │ NOT NULL           │
│ created_at  │ TIMESTAMP│        │                    │
└─────────────┴──────────┴────────┴────────────────────┘
```

### Available Data Types

**Numeric:**
- `INT`, `BIGINT`, `SMALLINT`, `TINYINT`
- `DECIMAL`, `FLOAT`, `DOUBLE`
- `BOOLEAN`

**String:**
- `VARCHAR`, `CHAR`
- `TEXT`, `MEDIUMTEXT`, `LONGTEXT`

**Date/Time:**
- `DATE`, `DATETIME`, `TIMESTAMP`, `TIME`

**Other:**
- `ENUM`, `JSON`

### Constraints

- **PRIMARY KEY (PK)**: Unique identifier
- **NOT NULL**: Required field
- **AUTO_INCREMENT (AI)**: Auto-generated value
- **FOREIGN KEY (FK)**: Reference to another table

## Editing Tables

### View Table Details

**Click on a table** to see details in the right panel:
- Table name
- Column count
- Primary keys
- Foreign keys
- Column list with types and constraints

### Edit Table Structure

1. Select table
2. Click **"Edit Table"** button
3. Modify:
   - Table name
   - Add/remove columns
   - Change column types
   - Update constraints
4. Click **"Save Changes"**

### Quick Edit

**Double-click** a table node to open edit modal directly.

## Creating Relationships

### Visual Method (Drag & Drop)

1. **Hover** over a column with FK potential
2. **Click and drag** from the right handle (●)
3. **Drop** on the target column's left handle (●)
4. Relationship created! 🔗

```
posts.user_id  ●──────────● users.id
                  N:1 badge
```

### Relationship Types

Visual badges show cardinality:

- **N:1** (Many-to-One): Many posts → One user
- **1:N** (One-to-Many): One user → Many posts
- **1:1** (One-to-One): One-to-one relationship

### Relationship Lines

Color coding:
- **Teal (#4ec9b0)**: Primary accent color
- **Blue (#569cd6)**: Secondary relationships
- **Solid line**: Active relationship
- **Badge**: Shows cardinality

### Delete Relationship

**Method 1:** Drag arrow to empty space
**Method 2:** Edit table and remove FK constraint

## Canvas Navigation

### Mouse Controls

| Action | Control |
|--------|---------|
| Pan canvas | Click + Drag background |
| Zoom in/out | Mouse wheel / Pinch |
| Select table | Click on table |
| Multi-select | Cmd+Click (future) |

### Zoom Controls

- **Zoom In**: Scroll up / Two-finger zoom in
- **Zoom Out**: Scroll down / Two-finger zoom out
- **Reset Zoom**: Double-click background
- **Fit View**: Press **F** key

### Keyboard Navigation

```
F           - Fit all tables in view
Space+Drag  - Pan canvas (future)
+/-         - Zoom in/out (future)
ESC         - Deselect all
```

## Organizing Tables

### Auto-Arrange

zxwdb uses ReactFlow's auto-layout:
- Tables arrange automatically when created
- Relationships route around tables
- Minimal line crossings

### Manual Arrangement

1. **Click and drag** tables to reposition
2. **Press F** to fit view after arranging
3. Relationships update automatically

### Layout Tips

**Good Layout:**
```
┌──────┐     ┌──────┐
│Parent│────▶│Child │
└──────┘     └──────┘
```

**Avoid Crossing:**
```
┌──────┐     ┌──────┐
│  A   │─┐ ┌─│  C   │
└──────┘ │ │ └──────┘
         X X
┌──────┐ │ │ ┌──────┐
│  B   │─┘ └─│  D   │
└──────┘     └──────┘
```

## Table Node Features

### Visual Elements

```
┌─────────────────────┐
│ 📊 table_name      │ ← Header with icon
├─────────────────────┤
│ ● id (INT) PK AI   │ ← Primary key
│ ○ name (VARCHAR)   │ ← Regular column
│ ● user_id (INT) FK │ ← Foreign key
└─────────────────────┘
  ●                 ● 
  └─ Connection handles
```

### Column Icons

- **●** Red dot: Primary key
- **○** Empty circle: Regular column
- **●** Blue dot: Foreign key

### Column Details

Each column shows:
- Name
- Data type (with length if applicable)
- Constraints (PK, FK, AI)

### Hover Effects

- **Hover table**: Highlights with border
- **Hover column**: Shows connection handles
- **Hover handle**: Prepares for relationship creation

## Mini Map

Bottom-right corner shows overview:
- Red box: Current viewport
- Blue boxes: Tables
- Gray lines: Relationships

**Click on mini map** to jump to that area.

## Context Menu

Right-click on canvas for quick actions (future feature):
- Add Table
- Paste
- Fit View
- Toggle Grid

## Grid and Snapping

### Grid Display

Background shows dot grid for alignment.

### Snap to Grid (Future)

```
Enable/disable snapping:
Settings → Snap to Grid
```

## Undo/Redo

### Actions that can be undone:

- ✅ Table creation
- ✅ Table deletion
- ✅ Column changes
- ✅ Relationship creation/deletion
- ✅ Data modifications

### Keyboard Shortcuts

```
Undo:  Cmd+Z / Ctrl+Z
Redo:  Cmd+Shift+Z / Ctrl+Shift+Z
```

### History Limit

Undo history: **50 actions**

## Performance

### Large Schemas

Optimized for schemas with:
- ✅ 100+ tables
- ✅ 1000+ columns
- ✅ Complex relationships

### Rendering

- 60 FPS smooth animations
- Lazy loading for large schemas
- Efficient re-rendering with React

## Keyboard Shortcuts

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| New Table | Cmd+N | Ctrl+N |
| Delete Table | Delete | Delete |
| Fit View | F | F |
| Undo | Cmd+Z | Ctrl+Z |
| Redo | Cmd+Shift+Z | Ctrl+Shift+Z |
| Deselect | ESC | ESC |
| Show Shortcuts | Hold Cmd | Hold Ctrl |

## Best Practices

### Naming Conventions

**Tables:** Plural nouns
```
✅ users, posts, comments
❌ user, post, comment
```

**Columns:** Snake_case
```
✅ user_id, created_at, first_name
❌ userId, createdAt, FirstName
```

**Foreign Keys:** `{table}_id`
```
✅ user_id, post_id, category_id
❌ uid, p_id, catId
```

### Schema Design

**Normalize data:**
- Avoid redundancy
- Use relationships instead of duplication
- Keep tables focused on single responsibility

**Use primary keys:**
- Every table should have a PK
- Usually `id` with AUTO_INCREMENT
- Use INT or BIGINT

**Index foreign keys:**
- All FK columns should be indexed
- Improves JOIN performance

## Examples

### One-to-Many

```sql
-- One user has many posts
users
  - id (PK)
  - username

posts
  - id (PK)
  - user_id (FK → users.id)
  - title
```

### Many-to-Many

```sql
-- Users have many roles, roles have many users
users
  - id (PK)
  - username

user_roles (junction table)
  - user_id (FK → users.id)
  - role_id (FK → roles.id)

roles
  - id (PK)
  - name
```

### Self-Referencing

```sql
-- Employees can have managers
employees
  - id (PK)
  - name
  - manager_id (FK → employees.id)
```

## Tips & Tricks

### Quick Table Creation

1. Use keyboard shortcut (Cmd+N)
2. Tab between fields
3. Press Enter to save

### Bulk Column Creation

In Add Table modal:
1. Add column
2. Click "Add Column" or Tab at last field
3. Repeat quickly

### Visual Inspection

- **Color-coded constraints**: Quick identification
- **Badge cardinality**: Understand relationships at a glance
- **Hover for details**: See full column info

### Efficient Workflow

1. **Plan first**: Sketch on paper
2. **Create tables**: One at a time
3. **Add relationships**: After all tables exist
4. **Arrange**: Position for clarity
5. **Test**: Add sample data

## Troubleshooting

### Table not appearing?

- Check if database connection is active
- Refresh page
- Check browser console (F12)

### Can't create relationship?

- Ensure data types match
- Check both columns exist
- Verify no circular dependencies

### Canvas performance slow?

- Close unused tabs
- Reduce visible tables (zoom out less)
- Clear browser cache

## Next Steps

- [Data Management →](/features/data-management)
- [Relationships →](/features/relationships)
- [SQL Editor →](/features/sql-editor)
- [Examples →](/examples/basic-schema)
