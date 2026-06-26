# Configuration

Learn how to configure zxwdb for your specific needs.

## Server Configuration

### Port Number

By default, zxwdb runs on port **20256**.

::: tip Why Port 20256?
We chose port 20256 to avoid conflicts with common development tools:
- 3000-3001: React, Next.js, Vite dev servers
- 8000-8080: Python, Java servers
- 5000-5173: Flask, Vite
- 20256: Rarely used, memorable number
:::

### Custom Port (Future Feature)

Currently, the port is fixed. Custom port configuration will be available in future versions:

```bash
# Coming soon
zxwdb --port 8888
```

### Network Access

By default, zxwdb listens on `localhost` only. To allow network access:

::: warning Security Warning
Only expose zxwdb to trusted networks. It connects directly to your database.
:::

```bash
# Future feature
zxwdb --host 0.0.0.0
```

## Database Configuration

### Connection Settings

Configure your database connection through the UI:

```
Host: localhost          # Or remote IP/hostname
Port: 3306              # Default MySQL port
Username: root          # Your database user
Password: ********      # Your password
Database: my_db         # Target database (optional)
```

### Connection String (Alternative)

::: tip Future Feature
Environment variable support coming soon:
```bash
export ZXWDB_DB_HOST=localhost
export ZXWDB_DB_PORT=3306
export ZXWDB_DB_USER=root
export ZXWDB_DB_PASS=secret
export ZXWDB_DB_NAME=my_database
```
:::

### SSL/TLS Connections

For secure database connections (future feature):

```bash
# Coming soon
zxwdb --ssl-ca=/path/to/ca.pem
```

## Theme Configuration

### Default Theme

Choose your default theme. Currently stored in browser localStorage:

```javascript
// localStorage key: 'zxwdb_theme'
// Values: 'dark' | 'light'
```

### Custom Theme Colors

To customize theme colors, modify the theme file in your zxwdb installation:

```javascript
// ~/.npm-global/lib/node_modules/@fiqihbadrian/zxwdb/frontend/src/styles/themes.js

export const darkTheme = {
  bg: {
    primary: '#202124',    // Change this
    secondary: '#2d2d2d',
    tertiary: '#1e1e1e'
  },
  // ...
}
```

::: warning
Modifying installation files is not recommended. Theme customization API coming soon.
:::

## Keyboard Shortcuts

### Default Shortcuts

All keyboard shortcuts are currently fixed:

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| New Table | Cmd+N | Ctrl+N |
| Browse Data | Cmd+B | Ctrl+B |
| Preview SQL | Cmd+P | Ctrl+P |
| Undo | Cmd+Z | Ctrl+Z |
| Redo | Cmd+Shift+Z | Ctrl+Shift+Z |
| Fit View | F | F |
| Delete | Delete | Delete |
| Close Modal | ESC | ESC |

### Custom Shortcuts (Future)

Shortcut customization will be available in future versions.

## Auto-Save Settings

### Current Behavior

All changes are auto-saved immediately to the database:
- ✅ Table creation
- ✅ Column modifications
- ✅ Relationship changes
- ✅ Data edits

### Disable Auto-Save (Future)

Option to disable auto-save coming in future versions:

```bash
# Future feature
zxwdb --no-auto-save
```

## Data Browser Settings

### Pagination

Default rows per page: **10**

To change (future feature):

```json
{
  "dataBrowser": {
    "rowsPerPage": 25
  }
}
```

### Query Timeout

Default query timeout: **30 seconds**

## UI Preferences

### Canvas Settings

Current defaults:
- Zoom level: 100%
- Min zoom: 25%
- Max zoom: 200%
- Grid: Enabled
- Snap to grid: Disabled

### Table Node Style

Current style:
- Width: Auto (based on columns)
- Max width: 400px
- Column font: Monaco, monospace
- Border radius: 8px

## Performance Settings

### Connection Pool

zxwdb uses mysql2 connection pooling:

```javascript
// Current defaults
{
  connectionLimit: 10,
  queueLimit: 0,
  waitForConnections: true
}
```

### Query Optimization

- Results limited to 1000 rows by default
- Automatic index detection
- Prepared statements for all queries

## Logging

### Console Logs

View logs in the SQL Editor console:
- Query execution logs
- Error messages
- Execution time
- Affected rows

### Server Logs

To view server logs:

```bash
# Run with verbose logging (future)
zxwdb --verbose
```

## Environment Variables

### Supported Variables (Future)

```bash
# Database
export ZXWDB_DB_HOST=localhost
export ZXWDB_DB_PORT=3306
export ZXWDB_DB_USER=root
export ZXWDB_DB_PASS=secret

# Server
export ZXWDB_PORT=20256
export ZXWDB_HOST=localhost

# Features
export ZXWDB_AUTO_SAVE=true
export ZXWDB_THEME=dark
```

## Configuration File

### Future: zxwdb.config.js

Configuration file support coming soon:

```javascript
// zxwdb.config.js
export default {
  server: {
    port: 20256,
    host: 'localhost'
  },
  database: {
    host: 'localhost',
    port: 3306,
    user: 'root'
  },
  theme: {
    default: 'dark',
    colors: {
      primary: '#4ec9b0',
      secondary: '#569cd6'
    }
  },
  features: {
    autoSave: true,
    queryTimeout: 30000,
    rowsPerPage: 10
  }
}
```

## Docker Configuration

### Run with Docker (Future)

```bash
docker run -p 20256:20256 \
  -e ZXWDB_DB_HOST=host.docker.internal \
  -e ZXWDB_DB_PORT=3306 \
  fiqihbadrian/zxwdb
```

### Docker Compose

```yaml
version: '3.8'
services:
  zxwdb:
    image: fiqihbadrian/zxwdb
    ports:
      - "20256:20256"
    environment:
      - ZXWDB_DB_HOST=mysql
      - ZXWDB_DB_USER=root
      - ZXWDB_DB_PASS=secret
  
  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=secret
```

## Advanced Configuration

### Proxy Setup

If running behind a proxy:

```bash
# Set proxy (Node.js respects these)
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
```

### Custom Certificate Authority

For self-signed certificates:

```bash
# Future feature
export NODE_EXTRA_CA_CERTS=/path/to/ca.pem
```

## Troubleshooting Configuration

### Port Already in Use

```bash
# Find what's using port 20256
lsof -i :20256          # macOS/Linux
netstat -ano | findstr :20256   # Windows

# Kill the process
kill -9 <PID>           # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Cannot Connect to Database

Check your database configuration:

```bash
# Test connection manually
mysql -h localhost -P 3306 -u root -p

# Check MySQL is running
sudo systemctl status mysql     # Linux
brew services list              # macOS
```

### Theme Not Persisting

Clear browser cache and localStorage:

```javascript
// In browser console
localStorage.removeItem('zxwdb_theme')
```

## Best Practices

### Security

1. **Don't expose to public internet**
2. **Use strong database passwords**
3. **Run on localhost only in production**
4. **Use read-only users for viewing**

### Performance

1. **Limit result sets** - Don't query large tables without WHERE
2. **Use indexes** - Create indexes on FK columns
3. **Close unused connections** - Don't leave multiple tabs open

### Workflow

1. **Use version control** - Export SQL and commit
2. **Test locally first** - Don't design directly on production
3. **Backup before changes** - Dump database before major changes

## Configuration Checklist

Before starting a project:

- [ ] Database connection tested
- [ ] User has proper privileges
- [ ] Port 20256 is available
- [ ] Browser is up to date
- [ ] Theme preference set
- [ ] Shortcuts learned

## Next Steps

- [Visual Designer →](/features/visual-designer)
- [Keyboard Shortcuts →](/features/keyboard-shortcuts)
- [API Reference →](/api/cli)

## Request Features

Have configuration needs? Request features:

- [GitHub Issues](https://github.com/fiqihbadrian/zxwdb/issues)
- [GitHub Discussions](https://github.com/fiqihbadrian/zxwdb/discussions)
