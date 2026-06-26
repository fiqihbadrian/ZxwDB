---
layout: home

hero:
  name: zxwdb
  text: Visual Database Designer
  tagline: Modern, Fast, and Intuitive MySQL/MariaDB Designer
  image:
    src: /logo.svg
    alt: zxwdb Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/fiqihbadrian/zxwdb
    - theme: alt
      text: View on NPM
      link: https://www.npmjs.com/package/@fiqihbadrian/zxwdb

features:
  - icon: 🎨
    title: Visual Designer
    details: Drag-and-drop interface for designing database schemas. Create tables, columns, and relationships visually with an intuitive canvas.
    
  - icon: 🔗
    title: Smart Relationships
    details: Automatically detects foreign key constraints. Visual relationship lines with cardinality badges (1:N, N:1). Easy FK creation by dragging between columns.
    
  - icon: 💾
    title: Auto-Save
    details: All changes are saved to the database immediately. No need to export SQL manually - works like MySQL Workbench.
    
  - icon: ⚡
    title: Lightning Fast
    details: Built with React and Vite for instant feedback. Real-time schema updates with smooth animations and interactions.
    
  - icon: 📊
    title: Data Management
    details: Browse, insert, edit, and delete table data directly. Query builder with JOIN templates. View related records through FK relationships.
    
  - icon: 🎯
    title: SQL Editor
    details: Built-in SQL editor with syntax highlighting. Run any SQL query with execution console. Test relationships with verify FK templates.
    
  - icon: ⌨️
    title: Keyboard Shortcuts
    details: Full keyboard navigation support. Cmd+Z/Cmd+Shift+Z for undo/redo. Quick actions with hotkeys (Cmd+N, Cmd+B, Cmd+P).
    
  - icon: 🌙
    title: Dark/Light Theme
    details: Chrome-inspired theme system with smooth transitions. Brand colors (teal/blue) preserved across themes. Persists to localStorage.
    
  - icon: 🔄
    title: Import Existing Schema
    details: Automatically import schema from existing MySQL/MariaDB databases. Preserves all columns, types, constraints, and relationships.
---

## Quick Start

Install zxwdb globally via npm:

```bash
npm install -g @fiqihbadrian/zxwdb
```

Start the designer:

```bash
zxwdb
```

Open your browser at [http://localhost:20256](http://localhost:20256)

## Why zxwdb?

- **🚀 Modern Stack**: Built with React, Vite, and ReactFlow for a smooth, responsive experience
- **💡 Intuitive**: Visual drag-and-drop interface that feels natural
- **🔧 Powerful**: Full CRUD operations on both schema and data
- **📦 Portable**: Single npm package, runs anywhere Node.js runs
- **🎨 Beautiful**: Clean UI with dark/light themes inspired by Chrome
- **⚡ Fast**: Instant startup, real-time updates, no lag

## What You Can Do

### Design Visually
- Create tables with columns, data types, and constraints
- Drag to create foreign key relationships
- Auto-arrange tables with fit-to-screen
- Zoom and pan the canvas

### Manage Data
- Browse table data with pagination
- Insert, edit, and delete rows
- View related records (FK relationships)
- Run custom SQL queries

### Professional Features
- Undo/Redo support for all operations
- SQL preview (DDL generation)
- Import existing database schemas
- Keyboard shortcuts for power users
- Auto-save to database

## Supported Databases

- ✅ MySQL 5.7+
- ✅ MySQL 8.0+
- ✅ MariaDB 10.3+
- ✅ MariaDB 10.11+

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

## License

MIT © 2026 Fiqih Badrian
