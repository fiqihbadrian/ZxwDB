# CLI Commands

Complete reference for zxwdb command-line interface.

## Installation

```bash
npm install -g @fiqihbadrian/zxwdb
```

## Basic Usage

### Start Server

```bash
zxwdb
```

Starts the web server on port 20256.

**Output:**
```
🚀 zxwdb v1.0.12 - Visual Database Designer

Server running at:
  ➜ Local:    http://localhost:20256
  ➜ Network:  http://192.168.1.100:20256

Press Ctrl+C to stop
```

### Version

```bash
zxwdb --version
# or
zxwdb -v
```

Shows current version.

### Help

```bash
zxwdb --help
# or
zxwdb -h
```

Shows available commands and options.

## Options (Future Features)

### Custom Port

```bash
# Coming soon
zxwdb --port 8080
zxwdb -p 8080
```

Start on custom port.

### Custom Host

```bash
# Coming soon
zxwdb --host 0.0.0.0
```

Bind to specific network interface.

### Database Connection

```bash
# Coming soon
zxwdb --db-host localhost --db-port 3306 --db-user root
```

Pre-configure database connection.

### Verbose Mode

```bash
# Coming soon
zxwdb --verbose
zxwdb -V
```

Enable detailed logging.

### Quiet Mode

```bash
# Coming soon
zxwdb --quiet
zxwdb -q
```

Suppress non-error output.

### Configuration File

```bash
# Coming soon
zxwdb --config ./zxwdb.config.js
zxwdb -c ./zxwdb.config.js
```

Load configuration from file.

## Environment Variables

### Server Configuration

```bash
export ZXWDB_PORT=20256
export ZXWDB_HOST=localhost
```

### Database Configuration

```bash
export ZXWDB_DB_HOST=localhost
export ZXWDB_DB_PORT=3306
export ZXWDB_DB_USER=root
export ZXWDB_DB_PASS=secret
export ZXWDB_DB_NAME=my_database
```

### Feature Flags

```bash
export ZXWDB_AUTO_SAVE=true
export ZXWDB_THEME=dark
export ZXWDB_DEBUG=false
```

## Examples

### Basic Start

```bash
zxwdb
```

### Start with Environment Variables

```bash
ZXWDB_PORT=8080 zxwdb
```

### Start with All Options (Future)

```bash
zxwdb \
  --port 8080 \
  --host 0.0.0.0 \
  --db-host localhost \
  --db-user root \
  --verbose
```

## Process Management

### Run in Background

```bash
# Using nohup
nohup zxwdb > zxwdb.log 2>&1 &

# Using screen
screen -S zxwdb
zxwdb
# Ctrl+A, D to detach
```

### Stop Server

```bash
# Find process
ps aux | grep zxwdb

# Kill process
kill <PID>

# Or use Ctrl+C in terminal
```

### Auto-Restart on Crash

```bash
# Using forever
npm install -g forever
forever start $(which zxwdb)

# Using pm2
npm install -g pm2
pm2 start zxwdb --name "zxwdb-server"
```

## Systemd Service (Linux)

Create `/etc/systemd/system/zxwdb.service`:

```ini
[Unit]
Description=zxwdb Visual Database Designer
After=network.target mysql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/zxwdb
ExecStart=/usr/bin/zxwdb
Restart=on-failure
RestartSec=10

Environment="ZXWDB_PORT=20256"
Environment="ZXWDB_DB_HOST=localhost"

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable zxwdb
sudo systemctl start zxwdb
sudo systemctl status zxwdb
```

## Docker

### Run with Docker

```bash
docker run -d \
  --name zxwdb \
  -p 20256:20256 \
  -e ZXWDB_DB_HOST=host.docker.internal \
  -e ZXWDB_DB_PORT=3306 \
  -e ZXWDB_DB_USER=root \
  -e ZXWDB_DB_PASS=secret \
  fiqihbadrian/zxwdb:latest
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  zxwdb:
    image: fiqihbadrian/zxwdb:latest
    ports:
      - "20256:20256"
    environment:
      - ZXWDB_DB_HOST=mysql
      - ZXWDB_DB_PORT=3306
      - ZXWDB_DB_USER=root
      - ZXWDB_DB_PASS=secret
      - ZXWDB_DB_NAME=myapp
    depends_on:
      - mysql
    restart: unless-stopped

  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=secret
      - MYSQL_DATABASE=myapp
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  mysql_data:
```

Start with:

```bash
docker-compose up -d
```

## Nginx Reverse Proxy

Configure Nginx:

```nginx
server {
    listen 80;
    server_name db.example.com;

    location / {
        proxy_pass http://localhost:20256;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :20256          # macOS/Linux
netstat -ano | findstr :20256   # Windows

# Kill process
kill -9 <PID>           # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Permission Denied

```bash
# Run with sudo (not recommended)
sudo zxwdb

# Or fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
```

### Module Not Found

```bash
# Reinstall
npm uninstall -g @fiqihbadrian/zxwdb
npm install -g @fiqihbadrian/zxwdb

# Clear npm cache
npm cache clean --force
```

### Command Not Found

```bash
# Check npm global bin path
npm bin -g

# Add to PATH
export PATH=$PATH:$(npm bin -g)

# Add to shell profile
echo 'export PATH=$PATH:'$(npm bin -g) >> ~/.bashrc
source ~/.bashrc
```

## Advanced Usage

### Custom Node Options

```bash
# Increase memory limit
NODE_OPTIONS="--max-old-space-size=4096" zxwdb

# Enable debugging
NODE_OPTIONS="--inspect" zxwdb
```

### Development Mode

```bash
# Clone repository
git clone https://github.com/fiqihbadrian/zxwdb.git
cd zxwdb

# Install dependencies
npm install

# Run in development
npm run dev
```

### Build from Source

```bash
# Clone and build
git clone https://github.com/fiqihbadrian/zxwdb.git
cd zxwdb

# Install and build
npm install
npm run build

# Link globally
npm link
```

## Logging

### View Logs

```bash
# Redirect to file
zxwdb > zxwdb.log 2>&1

# View in real-time
tail -f zxwdb.log
```

### Log Levels (Future)

```bash
zxwdb --log-level debug
zxwdb --log-level info
zxwdb --log-level warn
zxwdb --log-level error
```

## Performance Tuning

### Node.js Options

```bash
# Increase V8 heap
NODE_OPTIONS="--max-old-space-size=8192" zxwdb

# Enable performance monitoring
NODE_OPTIONS="--perf-prof" zxwdb
```

### Connection Pooling

Set environment variables:

```bash
export ZXWDB_DB_POOL_SIZE=20
export ZXWDB_DB_POOL_QUEUE=0
```

## Security

### Firewall Rules

```bash
# Allow only localhost
sudo ufw allow from 127.0.0.1 to any port 20256

# Allow specific IP
sudo ufw allow from 192.168.1.0/24 to any port 20256
```

### Authentication (Future)

```bash
zxwdb --auth --username admin --password secret
```

### HTTPS (Future)

```bash
zxwdb --https --cert ./cert.pem --key ./key.pem
```

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Port in use |
| 3 | Database connection failed |
| 130 | Terminated by Ctrl+C |

## Command Reference

### Available Now

- `zxwdb` - Start server
- `zxwdb --version` - Show version
- `zxwdb --help` - Show help

### Coming Soon

- `zxwdb init` - Initialize configuration
- `zxwdb migrate` - Run migrations
- `zxwdb export` - Export schema
- `zxwdb import` - Import schema
- `zxwdb validate` - Validate schema

## Integration Examples

### npm Scripts

```json
{
  "scripts": {
    "db:designer": "zxwdb",
    "db:start": "zxwdb --port 8080"
  }
}
```

### VS Code Tasks

Create `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start zxwdb",
      "type": "shell",
      "command": "zxwdb",
      "isBackground": true,
      "problemMatcher": []
    }
  ]
}
```

## Next Steps

- [REST API Reference →](/api/rest-api)
- [Configuration →](/api/configuration)
- [Getting Started →](/guide/getting-started)
