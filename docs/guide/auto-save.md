# Auto-Save

Understanding how zxwdb's auto-save system works.

## Overview

zxwdb automatically saves all changes directly to your MySQL/MariaDB database - no export/import needed!

**Key Features:**
- ✅ Instant save to database
- ✅ No manual save button
- ✅ No export to SQL files
- ✅ Works like MySQL Workbench
- ✅ Undo/Redo support

## How It Works

### Direct Database Manipulation

Unlike diagram tools, zxwdb connects directly to your database:

```
Traditional Tools:
Design → Export SQL → Run SQL → Database Updated
(multiple steps, manual)

zxwdb:
Design → Database Updated
(instant, automatic)
```

### What Gets Auto-Saved

**Schema Changes:**
- ✅ Creating tables
- ✅ Modifying columns
- ✅ Adding/removing constraints
- ✅ Creating relationships (FK)
- ✅ Deleting relationships
- ✅ Renaming tables

**Data Changes:**
- ✅ Inserting rows
- ✅ Updating rows
- ✅ Deleting rows

## Operations Flow

### Creating a Table

```
User: Click "Create Table"
  ↓
Frontend: Open modal
  ↓
User: Fill form and click Save
  ↓
Frontend: Validate input
  ↓
API Call: POST /api/tables/:connectionId
  ↓
Backend: Execute CREATE TABLE
  ↓
MySQL: Table created instantly
  ↓
Backend: Query table structure
  ↓
Frontend: Add to canvas
  ↓
✅ Table saved and visible
```

**SQL Executed:**
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Creating a Relationship

```
User: Drag from column handle
  ↓
Frontend: Detect target column
  ↓
User: Drop on target
  ↓
API Call: POST /api/relationships/:connectionId
  ↓
Backend: Execute ALTER TABLE ADD CONSTRAINT
  ↓
MySQL: Foreign key constraint created
  ↓
Frontend: Draw relationship line
  ↓
✅ FK saved and enforced
```

**SQL Executed:**
```sql
ALTER TABLE posts
ADD CONSTRAINT fk_posts_user_id
FOREIGN KEY (user_id) 
REFERENCES users(id)
ON DELETE CASCADE
ON UPDATE CASCADE;
```

### Modifying Data

```
User: Edit row in data browser
  ↓
Frontend: Inline editing mode
  ↓
User: Change value and save
  ↓
API Call: PUT /api/data/:connectionId/:table/:id
  ↓
Backend: Execute UPDATE
  ↓
MySQL: Row updated instantly
  ↓
Frontend: Show updated value
  ↓
✅ Data saved
```

**SQL Executed:**
```sql
UPDATE users 
SET username = 'newname', email = 'new@email.com'
WHERE id = 1;
```

## Safety Features

### Transaction Support

All operations use transactions:

```sql
START TRANSACTION;
  -- Your changes here
  ALTER TABLE posts ADD COLUMN status VARCHAR(20);
  UPDATE posts SET status = 'draft';
COMMIT; -- Only if successful
```

If any step fails:
```sql
ROLLBACK; -- Undo all changes
```

### Undo/Redo

Even with auto-save, you can undo:

```javascript
// History tracking
{
  history: [
    { type: 'CREATE_TABLE', table: 'users' },
    { type: 'ADD_COLUMN', table: 'users', column: 'bio' },
    { type: 'CREATE_FK', from: 'posts', to: 'users' }
  ],
  historyIndex: 2
}
```

**Undo (Cmd+Z):**
1. Get previous action
2. Execute reverse operation
3. Update database
4. Update UI

**Example:**
```
Action: CREATE TABLE users
Undo:   DROP TABLE users

Action: ADD COLUMN bio
Undo:   ALTER TABLE users DROP COLUMN bio
```

### Validation

Before saving, zxwdb validates:

**Table Names:**
- Must be alphanumeric + underscore
- Cannot start with number
- Max 64 characters
- No SQL keywords

**Columns:**
- Valid data types
- Length appropriate for type
- Constraints compatible
- No duplicate names

**Relationships:**
- Data types match
- Referenced table exists
- No circular dependencies
- Columns exist

### Error Handling

If save fails:

```javascript
try {
  await api.createTable(table)
  // Success: Table added to UI
} catch (error) {
  // Show error message
  showError(error.message)
  // UI reverts to previous state
  // Database unchanged
}
```

**Common Errors:**
- Table already exists
- Invalid column type
- FK constraint violation
- Insufficient permissions
- Connection lost

## Benefits

### Instant Feedback

**Traditional Workflow:**
```
1. Design schema (5 min)
2. Export to SQL (30 sec)
3. Open SQL client (10 sec)
4. Run SQL (5 sec)
5. Check for errors (1 min)
6. Fix errors, repeat
Total: 7-10 minutes
```

**zxwdb Workflow:**
```
1. Design schema (5 min)
2. Auto-saved instantly
Total: 5 minutes
```

### No Export/Import

**Traditional:**
- Export SQL from tool
- Save to file
- Open in MySQL client
- Run SQL file
- Hope it works
- Debug if errors

**zxwdb:**
- Just design
- It's already saved
- Test immediately

### Real-Time Collaboration

Multiple users can work simultaneously:
```
User A: Creates table "users"
  → Instantly in database
User B: Creates relationship to "users"
  → Works immediately (table exists)
```

### Testing

Test your schema instantly:
```
1. Create tables (auto-saved)
2. Insert test data (auto-saved)
3. Run queries (live database)
4. See results immediately
```

## Comparison

### vs Diagram Tools (dbdiagram.io, draw.io)

| Feature | Diagram Tools | zxwdb |
|---------|--------------|-------|
| Save to DB | ❌ Manual SQL | ✅ Auto |
| Test queries | ❌ No | ✅ Yes |
| Live data | ❌ No | ✅ Yes |
| Export needed | ✅ Yes | ❌ No |
| Sync issues | ✅ Common | ❌ Never |

### vs MySQL Workbench

| Feature | Workbench | zxwdb |
|---------|-----------|-------|
| Save to DB | ✅ Direct | ✅ Direct |
| Modern UI | ❌ Old | ✅ Modern |
| Web-based | ❌ Desktop | ✅ Browser |
| Undo/Redo | ⚠️ Limited | ✅ Full |
| Theme | ❌ No | ✅ Dark/Light |

### vs phpMyAdmin

| Feature | phpMyAdmin | zxwdb |
|---------|------------|-------|
| Save to DB | ✅ Direct | ✅ Direct |
| Visual design | ❌ No | ✅ Yes |
| Drag FK | ❌ No | ✅ Yes |
| Modern | ❌ Old | ✅ Modern |
| Relationships | ⚠️ Basic | ✅ Visual |

## Best Practices

### Design Workflow

**✅ DO:**
1. Connect to development database
2. Design and test
3. Export SQL (Cmd+P) for production
4. Run SQL in production

**❌ DON'T:**
1. Connect directly to production
2. Make changes without testing
3. Skip backups

### Backup Strategy

Even with auto-save:

```bash
# Daily backup
mysqldump -u root -p mydb > backup.sql

# Before major changes
mysqldump -u root -p mydb > backup_before_schema_change.sql
```

### Development vs Production

**Development:**
- Use zxwdb directly
- Auto-save enabled
- Experiment freely
- Undo mistakes

**Production:**
- Export SQL from dev
- Review changes
- Run in migration
- Never use zxwdb directly

### Version Control

Track schema changes:

```bash
# Export schema
zxwdb → Preview SQL (Cmd+P) → Copy

# Save to file
echo "CREATE TABLE..." > schema.sql

# Commit to git
git add schema.sql
git commit -m "Add users and posts tables"
```

## Limitations

### Current Limitations

**No Offline Mode:**
- Requires active database connection
- Changes saved immediately (can't queue)

**No Batch Save:**
- Each action saves individually
- Can't group changes into one transaction

**No Conflict Resolution:**
- Multiple users may conflict
- Last write wins

### Future Improvements

**Planned:**
- [ ] Offline mode with sync queue
- [ ] Batch operations
- [ ] Change preview before save
- [ ] Optional manual save mode
- [ ] Conflict detection
- [ ] Change review system

## Troubleshooting

### Changes Not Saving

**Check:**
1. Database connection active?
2. User has write permissions?
3. Table/column name valid?
4. No constraint violations?
5. Browser console for errors (F12)

**Solutions:**
```bash
# Verify connection
mysql -u root -p -e "SELECT 1"

# Check permissions
SHOW GRANTS FOR 'your_user'@'localhost';

# Grant permissions
GRANT ALL PRIVILEGES ON database.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
```

### Slow Save Operations

**Causes:**
- Large tables
- Complex constraints
- Slow database connection
- Missing indexes

**Solutions:**
```sql
-- Add indexes
CREATE INDEX idx_user_id ON posts(user_id);

-- Optimize tables
OPTIMIZE TABLE users, posts;

-- Check query performance
EXPLAIN SELECT * FROM posts WHERE user_id = 1;
```

### Undo Not Working

**Causes:**
- History limit reached (50 actions)
- Complex operation
- Manual SQL executed

**Solutions:**
- Use database backup
- Export schema before major changes
- Keep transaction logs

## FAQ

### Is it safe to use auto-save?

Yes! All operations use transactions and can be undone. However:
- ✅ Safe for development
- ⚠️ Use caution in production
- 🔒 Always backup first

### Can I disable auto-save?

Not currently. Future versions may offer:
- Manual save mode
- Confirmation dialogs
- Change preview

### What if I make a mistake?

1. **Undo** (Cmd+Z) - Reverses last action
2. **Restore from backup** - Use mysqldump backup
3. **Re-import schema** - Connect to backup database

### Does it work offline?

No. zxwdb requires active database connection. Future versions may support:
- Offline mode with sync queue
- Local schema cache
- Export/import for offline work

## Related

- [Configuration →](/guide/configuration)
- [Architecture →](/guide/architecture)
- [Visual Designer →](/features/visual-designer)
