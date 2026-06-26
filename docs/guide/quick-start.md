# Quick Start

Get up and running with zxwdb in 5 minutes. This tutorial will walk you through creating your first database schema.

## Step 1: Install and Start

```bash
# Install globally
npm install -g @fiqihbadrian/zxwdb

# Start zxwdb
zxwdb
```

Open your browser at **http://localhost:20256**

## Step 2: Connect to Database

1. Click **"Connect to Database"**
2. Enter your credentials:
   - Host: `localhost`
   - Port: `3306`
   - Username: `root`
   - Password: `your_password`
   - Database: `test_db` (or create new)
3. Click **"Connect"** (or press **Enter**)

## Step 3: Create Your First Table

### Using the Visual Designer

1. Click **"+ Add Table"** button (or press **Cmd+N** / **Ctrl+N**)
2. Fill in table details:
   ```
   Table Name: users
   
   Columns:
   - id          INT         PRIMARY KEY, AUTO_INCREMENT
   - username    VARCHAR     length: 50, NOT NULL
   - email       VARCHAR     length: 100, NOT NULL
   - created_at  TIMESTAMP
   ```
3. Click **"Create Table"**

Your table appears on the canvas! 🎉

## Step 4: Create Related Table

Let's create a `posts` table related to `users`:

1. Press **Cmd+N** to add another table
2. Configure the table:
   ```
   Table Name: posts
   
   Columns:
   - id          INT         PRIMARY KEY, AUTO_INCREMENT
   - user_id     INT         NOT NULL
   - title       VARCHAR     length: 200, NOT NULL
   - content     TEXT
   - created_at  TIMESTAMP
   ```
3. Click **"Create Table"**

## Step 5: Create Relationship

Now let's connect `posts.user_id` to `users.id`:

### Drag-and-Drop Method

1. Click on the **right handle** of `posts.user_id` column
2. Drag to the **left handle** of `users.id` column
3. Release to create the foreign key

You'll see a visual line with a **N:1** badge! 🔗

### Alternative: Edit Table

1. Click on `posts` table
2. Click **"Edit Table"** in the right panel
3. Add relationship manually through FK fields

## Step 6: Add Sample Data

Let's add some data to test:

1. Click on `users` table
2. Click **"Browse Data"** button (or press **Cmd+B**)
3. Click **"Add Row"**
4. Fill in the data:
   ```
   username: johndoe
   email: john@example.com
   ```
5. Click **"Save"**

Repeat for a few more users!

## Step 7: Insert Related Data

Now add posts for your users:

1. Click on `posts` table
2. Click **"Browse Data"**
3. Click **"Add Row"**
4. Fill in:
   ```
   user_id: 1  (the user you just created)
   title: My First Post
   content: This is my first post!
   ```
5. Click **"Save"**

## Step 8: View Relationships

See the relationship in action:

1. In the `posts` data browser
2. Click **"Related"** button next to a post
3. It shows the parent user from `users` table! 🎯

## Step 9: Run SQL Query

Let's run a JOIN query:

1. In the **"Browse Data"** modal, click **"Query"** tab
2. Try this query:
   ```sql
   SELECT posts.*, users.username 
   FROM posts 
   JOIN users ON posts.user_id = users.id
   ```
3. Click **"Run Query"**

You'll see posts with usernames! 📊

## Step 10: Preview SQL

See the generated DDL:

1. Press **Cmd+P** (or click Preview SQL in toolbar)
2. View the complete SQL schema
3. Copy for version control or documentation

## What You've Learned

✅ Connect to MySQL/MariaDB database  
✅ Create tables visually  
✅ Add columns with constraints  
✅ Create foreign key relationships  
✅ Browse and edit table data  
✅ Navigate related records  
✅ Run custom SQL queries  
✅ Preview DDL schema  

## Next Steps

### Explore More Features

- **Undo/Redo**: Press **Cmd+Z** to undo, **Cmd+Shift+Z** to redo
- **Delete Table**: Select table and press **Delete** key
- **Fit View**: Press **F** to fit all tables in view
- **Keyboard Shortcuts**: Hold **Cmd/Ctrl** to see all shortcuts
- **Theme Toggle**: Click Sun/Moon icon to switch themes

### Common Workflows

#### Import Existing Schema

Already have a database?

1. Connect to your database
2. zxwdb automatically imports:
   - All tables
   - All columns with types
   - Primary keys
   - Foreign key relationships
3. Start editing visually!

#### Design New Schema

Starting from scratch?

1. Create new database
2. Add tables one by one
3. Create relationships by dragging
4. Test with sample data
5. Export SQL for production

#### Document Existing Database

Need documentation?

1. Import existing schema
2. Arrange tables nicely on canvas
3. Take screenshot (built-in)
4. Preview SQL for documentation

## Tips and Tricks

### Keyboard Navigation

```
Cmd+N / Ctrl+N    - New Table
Cmd+B / Ctrl+B    - Browse Data
Cmd+P / Ctrl+P    - Preview SQL
Cmd+Z / Ctrl+Z    - Undo
Cmd+Shift+Z       - Redo
F                 - Fit View
Delete            - Delete Selected Table
ESC               - Close Modal/Deselect
```

### Quick Actions

- **Double-click** table to edit structure
- **Right-click** canvas for context menu
- **Scroll** to zoom in/out
- **Drag** canvas to pan
- **Hold Cmd** to see shortcuts overlay

### Data Browser Tips

- Use **Search** to filter rows
- Click **Related** to navigate FKs
- Use **Query Templates** for common JOINs
- **Ctrl+Enter** to run queries quickly

## Common Patterns

### One-to-Many (1:N)

```
users (1) ----< posts (N)
users.id ----< posts.user_id
```

User has many posts.

### Many-to-Many (N:N)

```
users --< user_roles >-- roles
users.id --< user_roles.user_id
roles.id --< user_roles.role_id
```

Use junction table for many-to-many.

### Self-Referencing

```
employees
- id
- name
- manager_id (references employees.id)
```

Employees can have managers (who are also employees).

## Troubleshooting

### Table not appearing?

- Check console for errors (F12)
- Refresh the page
- Re-import schema

### Relationship not creating?

- Ensure data types match (INT -> INT)
- Check both columns exist
- Verify no conflicting constraints

### Data not saving?

- Check database connection
- Verify user permissions
- Check for constraint violations

## Example Schemas

### Blog System

```
users
  - id (PK)
  - username
  - email

posts
  - id (PK)
  - user_id (FK -> users.id)
  - title
  - content

comments
  - id (PK)
  - post_id (FK -> posts.id)
  - user_id (FK -> users.id)
  - content
```

### E-Commerce

```
customers
  - id (PK)
  - name
  - email

orders
  - id (PK)
  - customer_id (FK -> customers.id)
  - order_date

order_items
  - id (PK)
  - order_id (FK -> orders.id)
  - product_id (FK -> products.id)
  - quantity

products
  - id (PK)
  - name
  - price
```

## Video Tutorial

🎥 Watch the video walkthrough: *(Coming soon)*

## Need Help?

- 📖 [Full Features Guide →](/features/visual-designer)
- ⌨️ [Keyboard Shortcuts →](/features/keyboard-shortcuts)
- 🔧 [Configuration →](/guide/configuration)
- 💬 [Ask Questions →](https://github.com/fiqihbadrian/zxwdb/discussions)

## What's Next?

Now that you know the basics, explore advanced features:

- [Visual Designer Features →](/features/visual-designer)
- [Data Management →](/features/data-management)
- [SQL Editor →](/features/sql-editor)
- [Import/Export →](/features/import-export)
- [Example Schemas →](/examples/basic-schema)

Happy designing! 🚀
