# Keyboard Shortcuts

Master zxwdb with keyboard shortcuts for faster workflow.

## Shortcuts Overview

### Display Shortcuts Overlay

Hold **Cmd** (macOS) or **Ctrl** (Windows/Linux) to show all available shortcuts on screen.

## Global Shortcuts

### Navigation

| Action | macOS | Windows/Linux | Description |
|--------|-------|---------------|-------------|
| New Table | `Cmd+N` | `Ctrl+N` | Create new table |
| Browse Data | `Cmd+B` | `Ctrl+B` | Open data browser |
| Preview SQL | `Cmd+P` | `Ctrl+P` | Show SQL preview |
| Close Modal | `ESC` | `ESC` | Close any modal/dialog |
| Deselect | `ESC` | `ESC` | Deselect selected table |

### Editing

| Action | macOS | Windows/Linux | Description |
|--------|-------|---------------|-------------|
| Undo | `Cmd+Z` | `Ctrl+Z` | Undo last action |
| Redo | `Cmd+Shift+Z` | `Ctrl+Shift+Z` | Redo undone action |
| Delete Table | `Delete` | `Delete` | Delete selected table |
| Save | `Cmd+S` | `Ctrl+S` | Save (auto-save enabled) |

### Canvas

| Action | macOS | Windows/Linux | Description |
|--------|-------|---------------|-------------|
| Fit View | `F` | `F` | Fit all tables in view |
| Zoom In | `Scroll Up` | `Scroll Up` | Zoom in canvas |
| Zoom Out | `Scroll Down` | `Scroll Down` | Zoom out canvas |
| Pan Canvas | `Click+Drag` | `Click+Drag` | Move canvas |

## Modal Shortcuts

### Connection Modal

| Action | Shortcut | Description |
|--------|----------|-------------|
| Connect | `Enter` | Submit connection |
| Test | `Cmd+Enter` | Test connection |
| Close | `ESC` | Cancel connection |
| Next Field | `Tab` | Move to next field |
| Previous Field | `Shift+Tab` | Move to previous field |

### Add/Edit Table Modal

| Action | Shortcut | Description |
|--------|----------|-------------|
| Save | `Enter` | Save table |
| Cancel | `ESC` | Cancel changes |
| Add Column | `Cmd+Enter` | Add new column |
| Focus Next | `Tab` | Next input field |
| Focus Previous | `Shift+Tab` | Previous input field |

### Data Browser

| Action | macOS | Windows/Linux | Description |
|--------|-------|---------------|-------------|
| Add Row | `Cmd+N` | `Ctrl+N` | Create new row |
| Edit Row | `Cmd+E` | `Ctrl+E` | Edit selected row |
| Delete Row | `Delete` | `Delete` | Delete selected row |
| Save Edit | `Cmd+Enter` | `Ctrl+Enter` | Save changes |
| Cancel Edit | `ESC` | `ESC` | Cancel editing |
| Search | `Cmd+F` | `Ctrl+F` | Focus search |

### SQL Editor

| Action | macOS | Windows/Linux | Description |
|--------|-------|---------------|-------------|
| Run Query | `Cmd+Enter` | `Ctrl+Enter` | Execute SQL query |
| Clear Console | `Cmd+K` | `Ctrl+K` | Clear console output |
| New Query | `Cmd+N` | `Ctrl+N` | New query tab |
| Format SQL | `Cmd+Shift+F` | `Ctrl+Shift+F` | Format query (future) |

## Context-Specific Shortcuts

### When Table is Selected

| Action | Shortcut | Description |
|--------|----------|-------------|
| Edit Structure | `E` | Open edit modal |
| Browse Data | `B` | Open data browser |
| Delete Table | `Delete` | Delete table (with confirm) |
| Duplicate | `Cmd+D` | Duplicate table (future) |

### When in Canvas

| Action | Shortcut | Description |
|--------|----------|-------------|
| Select All | `Cmd+A` | Select all tables (future) |
| Copy | `Cmd+C` | Copy selected (future) |
| Paste | `Cmd+V` | Paste table (future) |
| Cut | `Cmd+X` | Cut selected (future) |

### When Editing Text

| Action | Shortcut | Description |
|--------|----------|-------------|
| Select All | `Cmd+A` | Select all text |
| Copy | `Cmd+C` | Copy text |
| Paste | `Cmd+V` | Paste text |
| Undo | `Cmd+Z` | Undo text change |

## Mouse Shortcuts

### Click Actions

| Action | Mouse | Description |
|--------|-------|-------------|
| Select Table | `Click` | Select single table |
| Edit Table | `Double-Click` | Open edit modal |
| Pan Canvas | `Click+Drag` (background) | Move canvas |
| Create Relationship | `Drag` (from handle) | Draw FK line |

### Wheel Actions

| Action | Mouse | Description |
|--------|-------|-------------|
| Zoom | `Wheel Up/Down` | Zoom in/out |
| Pan Horizontal | `Shift+Wheel` | Pan left/right |
| Smooth Zoom | `Pinch` (trackpad) | Smooth zoom |

### Multi-Select (Future)

| Action | Mouse | Description |
|--------|-------|-------------|
| Multi-Select | `Cmd+Click` | Add to selection |
| Range Select | `Shift+Click` | Select range |
| Box Select | `Click+Drag` | Draw selection box |

## Shortcut Customization

::: tip Future Feature
Custom shortcut mapping coming soon:

```json
{
  "shortcuts": {
    "newTable": "Cmd+T",
    "browseData": "Cmd+D",
    "previewSQL": "Cmd+L"
  }
}
```
:::

## Platform Differences

### macOS vs Windows/Linux

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| Command Key | `Cmd` | `Ctrl` |
| Option Key | `Option` | `Alt` |
| Delete Forward | `Fn+Delete` | `Delete` |
| Delete Backward | `Delete` | `Backspace` |

### Browser Shortcuts

Some shortcuts may conflict with browser:

| Shortcut | Conflict | Solution |
|----------|----------|----------|
| `Cmd+N` | New Window | Works in app |
| `Cmd+W` | Close Tab | Not used |
| `Cmd+T` | New Tab | Not used |
| `Cmd+F` | Find | Not used in canvas |

## Shortcut Reference Card

### Quick Reference

```
┌─────────────────────────────────────────────────┐
│           zxwdb Keyboard Shortcuts              │
├─────────────────────────────────────────────────┤
│ TABLES                                          │
│   Cmd+N        New Table                        │
│   Delete       Delete Selected                  │
│   E            Edit Structure                   │
│   B            Browse Data                      │
│                                                 │
│ EDITING                                         │
│   Cmd+Z        Undo                             │
│   Cmd+Shift+Z  Redo                             │
│   Cmd+S        Save (auto)                      │
│                                                 │
│ CANVAS                                          │
│   F            Fit View                         │
│   Scroll       Zoom In/Out                      │
│   Click+Drag   Pan Canvas                       │
│                                                 │
│ MODALS                                          │
│   ESC          Close/Cancel                     │
│   Enter        Submit/Save                      │
│   Tab          Next Field                       │
│                                                 │
│ DATA                                            │
│   Cmd+B        Browse Data                      │
│   Cmd+Enter    Run Query                        │
│   Cmd+P        Preview SQL                      │
│                                                 │
│ HELP                                            │
│   Hold Cmd     Show Shortcuts                   │
│   ?            Help Modal (future)              │
└─────────────────────────────────────────────────┘
```

## Tips for Efficiency

### Learn These First

Master these 5 shortcuts for 80% efficiency:

1. **Cmd+N** - New Table
2. **Cmd+B** - Browse Data
3. **Cmd+Z** - Undo
4. **F** - Fit View
5. **ESC** - Close/Cancel

### Power User Workflow

```
1. Cmd+N           → Create table
2. Tab, Tab, Tab   → Fill fields quickly
3. Enter           → Save
4. Drag handles    → Create relationships
5. F               → Fit view
6. Cmd+B           → Add sample data
7. Cmd+P           → Preview SQL
```

### Avoid Mouse

Try working without mouse:

```
Start:    Cmd+N (new table)
Add:      Tab through fields
Save:     Enter
Navigate: F (fit view)
Data:     Cmd+B (browse)
Edit:     Tab to Edit button, Enter
Undo:     Cmd+Z
```

## Accessibility

### Screen Readers

All actions accessible via keyboard:
- ✅ Tab navigation
- ✅ ARIA labels
- ✅ Focus indicators
- ✅ Keyboard-only workflow

### Focus Management

- Focus visible with blue outline
- Logical tab order
- Skip links for long lists
- Modal focus trap

## Conflict Resolution

### Shadowed Shortcuts

Some shortcuts might be intercepted by browser:

**Browser Takes Priority:**
- `Cmd+Q` - Quit application
- `Cmd+W` - Close tab
- `Cmd+R` - Reload page
- `Cmd+T` - New tab

**Solution:** Use alternative shortcuts or browser in app mode:

```bash
# Chrome app mode
google-chrome --app=http://localhost:20256
```

### OS Shortcuts

System-level shortcuts override app:

**macOS:**
- `Cmd+Space` - Spotlight
- `Cmd+Tab` - Switch apps
- `Cmd+H` - Hide window

**Windows:**
- `Win+D` - Show desktop
- `Alt+Tab` - Switch windows
- `Ctrl+Alt+Del` - Task manager

## Future Enhancements

### Coming Soon

- **Custom key bindings**: Remap any shortcut
- **Vim mode**: hjkl navigation
- **Command palette**: Cmd+K for all actions
- **Macro recording**: Record action sequences
- **Shortcut hints**: Show hints on hover

### Requested Features

Vote for features you want:
- [ ] Emacs keybindings
- [ ] Customizable shortcuts
- [ ] Shortcut search
- [ ] Cheat sheet export
- [ ] Multi-cursor editing

## Practice Mode

::: tip Learn by Doing
Try the interactive shortcut tutorial:
1. Help → Shortcut Tutorial (future)
2. Practice each shortcut
3. Track your progress
4. Earn badges
:::

## Shortcut Philosophy

### Why Keyboard Shortcuts?

1. **Speed**: 10x faster than mouse
2. **Flow**: Stay in the zone
3. **Precision**: Exact actions
4. **Professional**: Power user tools
5. **Accessibility**: For all users

### Design Principles

- **Mnemonic**: N for New, B for Browse
- **Standard**: Follow platform conventions
- **Discoverable**: Hold Cmd to see all
- **Consistent**: Same patterns throughout
- **Learnable**: Start simple, add advanced

## Cheat Sheet Download

::: tip Print Reference
Download printable cheat sheet:
- [PDF (Letter)](#) - Coming soon
- [PDF (A4)](#) - Coming soon
- [PNG (Desktop Wallpaper)](#) - Coming soon
:::

## Related Resources

- [Visual Designer →](/features/visual-designer)
- [Data Management →](/features/data-management)
- [SQL Editor →](/features/sql-editor)
- [Configuration →](/guide/configuration)

## Feedback

Suggest new shortcuts:
- [GitHub Issues](https://github.com/fiqihbadrian/zxwdb/issues)
- [GitHub Discussions](https://github.com/fiqihbadrian/zxwdb/discussions)
