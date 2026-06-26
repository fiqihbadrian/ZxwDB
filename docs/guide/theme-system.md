# Theme System

Learn how zxwdb's dark/light theme system works.

## Overview

zxwdb features a Chrome-inspired theme system with:
- 🌙 **Dark Mode** (default)
- ☀️ **Light Mode**
- 🎨 **Brand Colors** preserved across themes
- 💾 **LocalStorage** persistence
- ⚡ **Smooth Transitions**

## Quick Start

### Toggle Theme

Click the **Sun/Moon icon** in the top-right corner:
- 🌙 Moon icon = Currently in light mode (click to go dark)
- ☀️ Sun icon = Currently in dark mode (click to go light)

### Keyboard Shortcut (Future)

```
Cmd+Shift+L  - Toggle theme
```

## Theme Colors

### Dark Theme (Default)

Inspired by Chrome Dark Mode:

```javascript
{
  bg: {
    primary: '#202124',    // Main background
    secondary: '#2d2d2d',  // Cards, panels
    tertiary: '#1e1e1e'    // Inputs, darker areas
  },
  text: {
    primary: '#e8eaed',    // Main text
    secondary: '#9aa0a6',  // Secondary text
    tertiary: '#5f6368'    // Disabled text
  },
  accent: {
    primary: '#4ec9b0',    // Teal (brand)
    secondary: '#569cd6',  // Blue (brand)
    tertiary: '#dcdcaa',   // Yellow
    error: '#f48771'       // Red
  },
  border: {
    primary: '#3a3a3a',    // Borders
    secondary: '#4a4a4a'   // Hover borders
  }
}
```

### Light Theme

Inspired by Chrome Light Mode:

```javascript
{
  bg: {
    primary: '#ffffff',    // Main background
    secondary: '#f8f9fa',  // Cards, panels
    tertiary: '#f1f3f4'    // Inputs, darker areas
  },
  text: {
    primary: '#202124',    // Main text
    secondary: '#5f6368',  // Secondary text
    tertiary: '#80868b'    // Disabled text
  },
  accent: {
    primary: '#4ec9b0',    // Teal (brand)
    secondary: '#569cd6',  // Blue (brand)
    tertiary: '#c5a332',   // Yellow
    error: '#d93025'       // Red
  },
  border: {
    primary: '#dadce0',    // Borders
    secondary: '#bdc1c6'   // Hover borders
  }
}
```

### Brand Colors

These colors remain **consistent** across themes:
- **Teal (#4ec9b0)**: Primary brand color
- **Blue (#569cd6)**: Secondary brand color

Used for:
- Accent buttons
- Foreign key relationships
- Primary actions
- Active states

## Implementation

### How It Works

```
User Clicks Toggle
       ↓
Update Store (theme: 'dark'/'light')
       ↓
Save to LocalStorage
       ↓
Components Re-render
       ↓
Apply New Colors
```

### Code Structure

**Theme Provider:**
```javascript
// ThemeProvider.jsx
export function ThemeProvider({ children }) {
  const { theme } = useAppStore()
  
  return (
    <div data-theme={theme}>
      {children}
    </div>
  )
}
```

**Using Theme:**
```javascript
import { useAppStore } from '../stores/appStore'
import { getTheme } from '../styles/themes'

function MyComponent() {
  const { theme } = useAppStore()
  const colors = getTheme(theme)
  
  return (
    <div style={{ 
      backgroundColor: colors.bg.primary,
      color: colors.text.primary 
    }}>
      Content
    </div>
  )
}
```

### Theme Store

```javascript
// appStore.js
{
  theme: 'dark', // or 'light'
  
  setTheme: (theme) => {
    set({ theme })
    localStorage.setItem('zxwdb_theme', theme)
  }
}
```

### Persistence

Theme preference saved to localStorage:

```javascript
// On load
const savedTheme = localStorage.getItem('zxwdb_theme') || 'dark'
set({ theme: savedTheme })

// On change
localStorage.setItem('zxwdb_theme', newTheme)
```

## Styling Patterns

### Inline Styles (Current Method)

```javascript
<div 
  style={{
    backgroundColor: colors.bg.secondary,
    color: colors.text.primary,
    borderColor: colors.border.primary
  }}
>
  Content
</div>
```

### Hover Effects

```javascript
<button
  style={{ backgroundColor: colors.accent.primary }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = colors.accent.secondary
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = colors.accent.primary
  }}
>
  Hover Me
</button>
```

### Conditional Styling

```javascript
style={{
  backgroundColor: colors.accent.primary,
  color: theme === 'dark' 
    ? colors.bg.tertiary 
    : '#ffffff'
}}
```

## Components Coverage

### ✅ Fully Themed Components

- App.jsx (header, theme toggle)
- DatabaseSelectionPage.jsx
- Canvas.jsx (ReactFlow integration)
- Sidebar.jsx
- TableNode.jsx
- Toolbar.jsx
- TableDetailsPanel.jsx
- ConnectionModal.jsx
- AddTableModal.jsx
- EditTableModal.jsx
- CreateDatabaseModal.jsx
- ConfirmDialog.jsx
- DataBrowser.jsx
- SQLEditor.jsx
- DocsModal.jsx

### ReactFlow Theming

ReactFlow components use custom styling:

```javascript
<ReactFlow
  nodes={nodes}
  edges={edges}
  defaultEdgeOptions={{
    style: { 
      stroke: colors.accent.primary,
      strokeWidth: 2 
    }
  }}
>
  <Background 
    color={colors.border.primary}
    gap={16}
  />
  <MiniMap 
    nodeColor={colors.accent.primary}
    maskColor={`${colors.bg.secondary}90`}
  />
</ReactFlow>
```

## Transitions

### Smooth Color Changes

All color transitions use CSS:

```css
* {
  transition: background-color 0.2s ease,
              color 0.2s ease,
              border-color 0.2s ease;
}
```

### Icon Transitions

Theme toggle icon animates:

```javascript
<motion.div
  animate={{ rotate: theme === 'dark' ? 0 : 180 }}
  transition={{ duration: 0.3 }}
>
  {theme === 'dark' ? <Sun /> : <Moon />}
</motion.div>
```

## Accessibility

### Contrast Ratios

All color combinations meet **WCAG AA** standards:
- Text on background: Minimum 4.5:1
- Large text: Minimum 3:1
- UI components: Minimum 3:1

### Dark Theme Benefits

- Reduces eye strain in low light
- Saves battery (OLED screens)
- Professional appearance
- Better for night work

### Light Theme Benefits

- Better in bright environments
- Familiar for some users
- Higher contrast for some
- Reduces blue light concerns

## Customization (Future)

### Custom Theme Colors

```javascript
// Future: zxwdb.config.js
export default {
  theme: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color'
    }
  }
}
```

### Theme Variants

Planned theme options:
- **Dark** (current)
- **Light** (current)
- **High Contrast** (future)
- **Blue** (future)
- **Auto** (system preference - future)

### System Preference

Auto-detect OS theme:

```javascript
// Future feature
const prefersDark = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches

if (theme === 'auto') {
  return prefersDark ? 'dark' : 'light'
}
```

## Design Philosophy

### Chrome-Inspired

Why Chrome's design?
- ✅ **Familiar**: Most users know Chrome
- ✅ **Clean**: Minimal, professional
- ✅ **Modern**: Up-to-date aesthetics
- ✅ **Tested**: Proven UX patterns

### Brand Identity

zxwdb maintains brand colors:
- **Teal (#4ec9b0)**: Database/tech feel
- **Blue (#569cd6)**: Trust, reliability
- Consistent across themes
- Instantly recognizable

### Transition Speed

200ms transitions:
- Fast enough to feel instant
- Slow enough to be smooth
- Not distracting
- Professional

## Best Practices

### Using Theme in Components

```javascript
// ✅ DO: Get theme at component level
function MyComponent() {
  const { theme } = useAppStore()
  const colors = getTheme(theme)
  
  return <div style={{ color: colors.text.primary }} />
}

// ❌ DON'T: Hardcode colors
function MyComponent() {
  return <div style={{ color: '#e8eaed' }} />
}
```

### Hover States

```javascript
// ✅ DO: Use theme colors for hover
onMouseEnter={(e) => {
  e.currentTarget.style.backgroundColor = colors.accent.secondary
}}

// ❌ DON'T: Hardcode hover colors
onMouseEnter={(e) => {
  e.currentTarget.style.backgroundColor = '#569cd6'
}}
```

### Conditional Colors

```javascript
// ✅ DO: Use theme-aware conditions
color: theme === 'dark' ? colors.bg.tertiary : '#ffffff'

// ❌ DON'T: Assume theme
color: colors.bg.tertiary // Might not work in light mode
```

## Troubleshooting

### Theme Not Persisting

```javascript
// Check localStorage
localStorage.getItem('zxwdb_theme')

// Clear and reset
localStorage.removeItem('zxwdb_theme')
// Reload page
```

### Colors Not Updating

1. Check if component uses `useAppStore`
2. Verify `getTheme(theme)` is called
3. Ensure inline styles use `colors.*`
4. Check for hardcoded colors

### Transition Glitches

```css
/* Add will-change for performance */
.themed-element {
  will-change: background-color, color;
}
```

## Performance

### Re-render Optimization

Theme changes trigger:
- ✅ Only components using `theme`
- ✅ Efficient Zustand updates
- ✅ React.memo where needed

### CSS Performance

```css
/* GPU acceleration for transitions */
.themed-element {
  transform: translateZ(0);
  will-change: background-color;
}
```

## Future Enhancements

### Planned Features

- [ ] Auto theme (system preference)
- [ ] Theme scheduling (auto dark at night)
- [ ] Custom color picker
- [ ] Theme presets (GitHub, VS Code, etc.)
- [ ] High contrast mode
- [ ] Theme export/import
- [ ] Per-project themes

### Community Themes

Future: User-contributed themes
- Upload to theme gallery
- Share with community
- One-click install

## Related

- [Architecture →](/guide/architecture)
- [Configuration →](/guide/configuration)
- [Getting Started →](/guide/getting-started)
