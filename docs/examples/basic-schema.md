# Basic Schema Example

Learn database design fundamentals with a simple user-posts schema.

## Overview

This example demonstrates:
- Creating basic tables
- Defining columns with constraints
- Setting up primary keys
- Creating foreign key relationships
- Adding sample data

## Schema Design

### Visual Representation

```
┌──────────────────┐         ┌──────────────────┐
│     users        │         │     posts        │
├──────────────────┤         ├──────────────────┤
│ ● id (PK)        │────────<│ ● id (PK)        │
│ ○ username       │   1:N   │ ● user_id (FK)   │
│ ○ email          │         │ ○ title          │
│ ○ created_at     │         │ ○ content        │
└──────────────────┘         │ ○ published_at   │
                             └──────────────────┘
```

### Relationship
- **One user** can have **many posts**
- **One post** belongs to **one user**
- Cardinality: **1:N** (One-to-Many)

## Step-by-Step Implementation

### Step 1: Create Users Table

1. Click **"+ Add Table"**
2. Fill in the form:

```
Table Name: users

Columns:
┌─────────────┬───────────┬────────┬──────────────────────┐
│ Name        │ Type      │ Length │ Constraints          │
├─────────────┼───────────┼────────┼──────────────────────┤
│ id          │ INT       │        │ ☑ PK  ☑ AI          │
│ username    │ VARCHAR   │ 50     │ ☑ NOT NULL          │
│ email       │ VARCHAR   │ 100    │ ☑ NOT NULL          │
│ created_at  │ TIMESTAMP │        │                      │
└─────────────┴───────────┴────────┴──────────────────────┘
```

3. Click **"Create Table"**

**Generated SQL:**
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 2: Create Posts Table

1. Press **Cmd+N** (or click Add Table)
2. Configure the table:

```
Table Name: posts

Columns:
┌──────────────┬───────────┬────────┬──────────────────────┐
│ Name         │ Type      │ Length │ Constraints          │
├──────────────┼───────────┼────────┼──────────────────────┤
│ id           │ INT       │        │ ☑ PK  ☑ AI          │
│ user_id      │ INT       │        │ ☑ NOT NULL          │
│ title        │ VARCHAR   │ 200    │ ☑ NOT NULL          │
│ content      │ TEXT      │        │                      │
│ published_at │ TIMESTAMP │        │                      │
└──────────────┴───────────┴────────┴──────────────────────┘
```

3. Click **"Create Table"**

**Generated SQL:**
```sql
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 3: Create Relationship

**Visual Method:**
1. Hover over **posts.user_id** column
2. Click the **right handle (●)**
3. Drag to **users.id** left handle
4. Release to create FK

**SQL Generated:**
```sql
ALTER TABLE posts
ADD CONSTRAINT fk_posts_user_id
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE
ON UPDATE CASCADE;
```

### Step 4: Add Sample Data

#### Insert Users

1. Click on **users** table
2. Click **"Browse Data"**
3. Click **"Add Row"** and enter:

```sql
-- User 1
INSERT INTO users (username, email) VALUES 
('johndoe', 'john@example.com');

-- User 2
INSERT INTO users (username, email) VALUES 
('janedoe', 'jane@example.com');

-- User 3
INSERT INTO users (username, email) VALUES 
('bobsmith', 'bob@example.com');
```

#### Insert Posts

1. Click on **posts** table
2. Click **"Browse Data"**
3. Add posts:

```sql
-- Posts by John (user_id = 1)
INSERT INTO posts (user_id, title, content) VALUES 
(1, 'My First Post', 'Hello World! This is my first blog post.');

INSERT INTO posts (user_id, title, content) VALUES 
(1, 'Learning SQL', 'Today I learned about foreign keys and relationships.');

-- Posts by Jane (user_id = 2)
INSERT INTO posts (user_id, title, content) VALUES 
(2, 'Introduction to Databases', 'Databases are essential for modern applications.');

-- Posts by Bob (user_id = 3)
INSERT INTO posts (user_id, title, content) VALUES 
(3, 'Why I Love MySQL', 'MySQL is fast, reliable, and easy to use.');
```

### Step 5: Query the Data

**View all posts with usernames:**

```sql
SELECT 
  posts.id,
  posts.title,
  posts.content,
  users.username,
  posts.published_at
FROM posts
JOIN users ON posts.user_id = users.id
ORDER BY posts.published_at DESC;
```

**Result:**
```
┌────┬──────────────────────────┬─────────────┬─────────────────────┐
│ id │ title                    │ username    │ published_at        │
├────┼──────────────────────────┼─────────────┼─────────────────────┤
│ 4  │ Why I Love MySQL         │ bobsmith    │ 2026-06-26 14:27:00 │
│ 3  │ Introduction to Databases│ janedoe     │ 2026-06-26 14:26:45 │
│ 2  │ Learning SQL             │ johndoe     │ 2026-06-26 14:26:30 │
│ 1  │ My First Post            │ johndoe     │ 2026-06-26 14:26:15 │
└────┴──────────────────────────┴─────────────┴─────────────────────┘
```

## Key Concepts Explained

### Primary Key (PK)

```sql
id INT AUTO_INCREMENT PRIMARY KEY
```

- **Uniquely identifies** each row
- **Auto-increments** for new rows
- **Cannot be NULL**
- **Must be unique**

### Foreign Key (FK)

```sql
user_id INT NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id)
```

- **Links to another table** (users.id)
- **Enforces referential integrity**
- **Prevents orphaned records**
- **ON DELETE CASCADE**: Delete posts when user deleted

### NOT NULL Constraint

```sql
username VARCHAR(50) NOT NULL
```

- **Field is required**
- **Cannot insert without value**
- **Ensures data integrity**

### TIMESTAMP

```sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

- **Automatically set** on insert
- **Tracks when record was created**
- **Useful for auditing**

## Testing the Relationship

### View Related Records

1. In **posts** data browser
2. Click **"Related"** button on any post
3. See the parent user record

### Verify Referential Integrity

Try inserting invalid data:

```sql
-- This will FAIL (user_id 999 doesn't exist)
INSERT INTO posts (user_id, title, content) VALUES 
(999, 'Invalid Post', 'This will not work');

-- Error: Cannot add or update a child row: 
-- a foreign key constraint fails
```

### Test CASCADE Delete

```sql
-- Delete a user
DELETE FROM users WHERE id = 1;

-- All posts by that user are also deleted (CASCADE)
SELECT * FROM posts WHERE user_id = 1;
-- Returns empty (no orphaned posts)
```

## Common Queries

### Get all posts by a user

```sql
SELECT * FROM posts 
WHERE user_id = 1
ORDER BY published_at DESC;
```

### Count posts per user

```sql
SELECT 
  users.username,
  COUNT(posts.id) as post_count
FROM users
LEFT JOIN posts ON users.id = posts.user_id
GROUP BY users.id, users.username
ORDER BY post_count DESC;
```

### Find users with no posts

```sql
SELECT users.* 
FROM users
LEFT JOIN posts ON users.id = posts.user_id
WHERE posts.id IS NULL;
```

### Recent posts with user info

```sql
SELECT 
  posts.title,
  posts.content,
  users.username,
  users.email,
  posts.published_at
FROM posts
JOIN users ON posts.user_id = users.id
WHERE posts.published_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY posts.published_at DESC;
```

## Best Practices

### ✅ DO

- Use **INT** for primary keys
- Always add **PRIMARY KEY** constraint
- Use **AUTO_INCREMENT** for IDs
- Add **NOT NULL** to required fields
- Use **meaningful column names** (user_id, not uid)
- Add **timestamps** for auditing

### ❌ DON'T

- Don't use VARCHAR for IDs
- Don't forget foreign key indexes
- Don't allow NULL in required fields
- Don't use vague names (data, value, info)
- Don't skip referential integrity

## Schema Evolution

### Add Published Status

```sql
ALTER TABLE posts
ADD COLUMN is_published BOOLEAN DEFAULT FALSE;
```

### Add View Count

```sql
ALTER TABLE posts
ADD COLUMN view_count INT DEFAULT 0;
```

### Add User Profile

```sql
ALTER TABLE users
ADD COLUMN bio TEXT,
ADD COLUMN avatar_url VARCHAR(255);
```

## Extending the Schema

### Add Comments Table

```
posts (1) ────< comments (N)
users (1) ────< comments (N)
```

```sql
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Add Categories

```
categories (1) ────< posts (N)
```

```sql
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE
);

ALTER TABLE posts
ADD COLUMN category_id INT,
ADD FOREIGN KEY (category_id) REFERENCES categories(id);
```

## Practice Exercises

### Exercise 1: Add Likes

Create a table to track post likes:
- User can like multiple posts
- Post can have multiple likes
- No duplicate likes (user + post unique)

<details>
<summary>Solution</summary>

```sql
CREATE TABLE post_likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  UNIQUE KEY unique_like (user_id, post_id)
);
```
</details>

### Exercise 2: Query Optimization

Add indexes for common queries:
- Posts by user_id
- Posts by published_at

<details>
<summary>Solution</summary>

```sql
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_published_at ON posts(published_at);
CREATE INDEX idx_posts_user_published ON posts(user_id, published_at);
```
</details>

## Next Steps

Learn more advanced patterns:

- [E-Commerce Schema →](/examples/e-commerce)
- [Blog System →](/examples/blog-system)
- [Advanced Features →](/examples/advanced-features)

## Resources

- [Visual Designer →](/features/visual-designer)
- [Data Management →](/features/data-management)
- [Relationships →](/features/relationships)
