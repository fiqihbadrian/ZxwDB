# Changelog

All notable changes to zxwdb will be documented here.

## [1.0.12] - 2026-06-26

### 🎨 Added
- **Dark/Light Theme System**: Chrome-inspired theme toggle with smooth transitions
  - Sun/Moon icon toggle button
  - Dark theme (#202124) as default
  - Light theme (#ffffff) option
  - Theme persists to localStorage
  - All components follow theme system
- **Enter Key Support**: Press Enter in connection modal to connect quickly

### 🔧 Changed
- **Port Changed**: Default port changed from 3001 to 20256
  - Avoids conflicts with common dev tools
  - More memorable number
  - Updated all documentation
- **Relative URLs**: All API calls use relative URLs instead of hardcoded localhost:3001
  - Better for deployment and proxying
  - Works with any hostname

### 🎯 Updated Components
- App.jsx - Header with theme toggle
- DatabaseSelectionPage.jsx - Full theme support
- Canvas.jsx - ReactFlow theme integration
- Sidebar.jsx - Themed table list
- TableNode.jsx - Themed table cards
- Toolbar.jsx - Themed buttons and modals
- TableDetailsPanel.jsx - Themed info panel
- ConnectionModal.jsx - Full theme + Enter key
- AddTableModal.jsx - Themed
- EditTableModal.jsx - Themed
- CreateDatabaseModal.jsx - Themed
- ConfirmDialog.jsx - Themed
- DataBrowser.jsx - Themed
- SQLEditor.jsx - Themed with console
- DocsModal.jsx - Themed documentation

### 📚 Documentation
- Added THEME_UPDATE_SUMMARY.md
- Added QUICK_START_THEME.md
- Updated README.md with new port
- Updated all markdown docs

## [1.0.11] - 2026-06-20

### Added
- Initial public release
- Visual database designer for MySQL/MariaDB
- Drag-and-drop table creation
- Automatic schema import
- Foreign key relationship visualization
- Data browser with CRUD operations
- SQL Editor with query execution
- Undo/Redo support
- Keyboard shortcuts
- ReactFlow-based canvas
- Real-time database synchronization

### Features
- Auto-save to database
- Relationship cardinality badges (1:N, N:1)
- Related records navigation
- SQL preview (DDL generation)
- Dark theme UI
- Responsive design

## [1.0.10] - 2026-06-15 (Beta)

### Added
- Beta testing phase
- Core functionality complete
- Bug fixes and optimizations

## [1.0.0] - 2026-06-01 (Alpha)

### Added
- Initial alpha release
- Basic table creation
- Simple relationship drawing
- Data viewing

---

## Roadmap

### [1.1.0] - Planned (Q3 2026)

**Customization:**
- [ ] Custom port configuration
- [ ] Custom theme colors
- [ ] Configurable keyboard shortcuts
- [ ] Settings panel

**Features:**
- [ ] Export schema to SQL file
- [ ] Import from SQL file
- [ ] Schema comparison tool
- [ ] Migration generator
- [ ] Multi-database support (PostgreSQL)

**UI/UX:**
- [ ] Command palette (Cmd+K)
- [ ] Table search/filter
- [ ] Zoom controls UI
- [ ] Minimap toggle
- [ ] Grid snap toggle

### [1.2.0] - Planned (Q4 2026)

**Collaboration:**
- [ ] Multi-user support
- [ ] Real-time collaboration
- [ ] Change history
- [ ] Comments on tables/columns

**Advanced:**
- [ ] Index management
- [ ] Trigger editor
- [ ] View editor
- [ ] Stored procedure support

**Export:**
- [ ] Export as PNG/SVG
- [ ] Generate documentation
- [ ] Schema versioning
- [ ] Git integration

### [2.0.0] - Future

**Enterprise:**
- [ ] Authentication system
- [ ] Role-based access
- [ ] Audit logging
- [ ] Team workspaces

**Databases:**
- [ ] PostgreSQL support
- [ ] SQLite support
- [ ] MongoDB support (visualization)

**Cloud:**
- [ ] Cloud-hosted version
- [ ] Auto-backup
- [ ] Cloud database connections

## Contributing

See [CONTRIBUTING.md](https://github.com/fiqihbadrian/zxwdb/blob/main/CONTRIBUTING.md) for how to contribute.

## Versioning

We use [SemVer](https://semver.org/) for versioning:
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

## License

MIT © 2026 Fiqih Badrian
