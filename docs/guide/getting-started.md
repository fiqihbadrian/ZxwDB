# Getting Started

This guide will help you install and set up zxwdb on your system.

## Prerequisites

Before installing zxwdb, make sure you have:

- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (comes with Node.js)
- **MySQL/MariaDB**: Running instance (local or remote)

### Check Your Node.js Version

```bash
node --version
# Should output v18.0.0 or higher

npm --version
# Should output 9.0.0 or higher
```

### Install Node.js

If you don't have Node.js installed:

- **macOS**: `brew install node`
- **Windows**: Download from [nodejs.org](https://nodejs.org)
- **Linux**: Use your package manager (apt, yum, dnf)

```bash
# Ubuntu/Debian
sudo apt install nodejs npm

# Fedora/RHEL
sudo dnf install nodejs npm

# Arch Linux
sudo pacman -S nodejs npm
```

## Installation

### Install Globally (Recommended)

Install zxwdb globally to use it anywhere:

```bash
npm install -g @fiqihbadrian/zxwdb
```

Verify the installation:

```bash
zxwdb --version
# Should output: 1.0.12
```

### Install Locally

Or install in a specific project:

```bash
npm install @fiqihbadrian/zxwdb
```

Run with npx:

```bash
npx zxwdb
```

## First Run

### Start zxwdb

```bash
zxwdb
```

You should see:

```
🚀 zxwdb v1.0.12 - Visual Database Designer

Server running at:
  ➜ Local:    http://localhost:20256
  ➜ Network:  http://192.168.1.100:20256

Press Ctrl+C to stop
```

### Open in Browser

Open your browser and navigate to:

```
http://localhost:20256
```

## Database Connection

### Prepare Your Database

Make sure your MySQL/MariaDB server is running:

```bash
# Check MySQL status
mysql --version

# Start MySQL (if stopped)
sudo systemctl start mysql     # Linux
brew services start mysql      # macOS
net start MySQL                # Windows
```

### Connection Details

You'll need:

- **Host**: `localhost` (or your server IP)
- **Port**: `3306` (default MySQL port)
- **Username**: Your MySQL username (e.g., `root`)
- **Password**: Your MySQL password
- **Database**: Name of your database (optional, can create new)

### Connect to Database

1. Click **"Connect to Database"**
2. Enter your connection details:
   ```
   Host: localhost
   Port: 3306
   Username: root
   Password: your_password
   Database: (leave empty to see all databases)
   ```
3. Click **"Test Connection"** to verify
4. Click **"Connect"**

### Create New Database

If you don't have a database yet:

1. Leave the **Database** field empty
2. Connect to server
3. Click **"Create New Database"**
4. Enter database name (e.g., `my_project_db`)
5. Click **"Create"**

## Troubleshooting

### Port 20256 Already in Use

If port 20256 is occupied:

```bash
# Check what's using the port
lsof -i :20256          # macOS/Linux
netstat -ano | findstr :20256   # Windows

# Kill the process or use different port
# (Future version will support custom ports)
```

### Cannot Connect to Database

**Error: "Access denied for user"**

```bash
# Grant privileges
mysql -u root -p

GRANT ALL PRIVILEGES ON *.* TO 'your_user'@'localhost';
FLUSH PRIVILEGES;
```

**Error: "Can't connect to MySQL server"**

```bash
# Check MySQL is running
sudo systemctl status mysql     # Linux
brew services list              # macOS
```

**Error: "ER_NOT_SUPPORTED_AUTH_MODE"**

```sql
-- Change auth method
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

### Permission Issues (npm global install)

**EACCES: permission denied**

```bash
# Option 1: Use sudo (not recommended)
sudo npm install -g @fiqihbadrian/zxwdb

# Option 2: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile

# Then install normally
npm install -g @fiqihbadrian/zxwdb
```

### Browser Compatibility

zxwdb requires a modern browser:

- ✅ Chrome 90+ / Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

❌ Not supported: Internet Explorer

## Update zxwdb

To update to the latest version:

```bash
npm update -g @fiqihbadrian/zxwdb
```

Check for updates:

```bash
npm outdated -g @fiqihbadrian/zxwdb
```

## Uninstall

To remove zxwdb:

```bash
npm uninstall -g @fiqihbadrian/zxwdb
```

## Next Steps

Now that zxwdb is installed:

- 📖 [Quick Start Tutorial →](/guide/quick-start)
- 🎨 [Visual Designer Guide →](/features/visual-designer)
- ⌨️ [Keyboard Shortcuts →](/features/keyboard-shortcuts)
- 🔧 [Configuration Options →](/guide/configuration)

## Getting Help

Having issues?

- 📚 Check the [FAQ](#faq)
- 🐛 [Report a bug](https://github.com/fiqihbadrian/zxwdb/issues)
- 💬 [Ask on GitHub Discussions](https://github.com/fiqihbadrian/zxwdb/discussions)

## FAQ

### Can I use zxwdb with remote databases?

Yes! Just enter the remote server IP/hostname and credentials.

### Does it work with MySQL 5.x?

Yes, MySQL 5.7+ is supported. Older versions may have limited support.

### Is my data safe?

Yes, zxwdb connects directly to your database using mysql2 driver. All operations are logged and support undo/redo.

### Can multiple users use zxwdb simultaneously?

Yes, but be careful with concurrent schema changes. Use version control for schema migrations in production.

### Does it work offline?

The UI works offline, but you need database connectivity for actual operations.
