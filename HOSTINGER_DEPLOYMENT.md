# Deploy GTM Match to Hostinger

This guide walks you through deploying your Next.js application to Hostinger hosting.

## Prerequisites

### Check Your Hostinger Plan

Next.js requires Node.js, so you need:
- ✅ **Hostinger VPS** (Recommended)
- ✅ **Hostinger Cloud Hosting**
- ❌ **Shared Hosting** (Not suitable for Next.js)

If you have shared hosting, you'll need to upgrade to VPS or use Vercel instead.

## Method 1: Deploy to Hostinger VPS (Recommended)

### Step 1: Access Your VPS

1. **Login to Hostinger:**
   - Go to https://hpanel.hostinger.com
   - Login with your credentials

2. **Access VPS via SSH:**
   - Go to your VPS dashboard
   - Note your IP address and SSH credentials
   - Open terminal on your Mac:

```bash
ssh root@your-vps-ip-address
# Enter password when prompted
```

### Step 2: Install Node.js on VPS

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18 (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x or higher

# Install PM2 (process manager)
sudo npm install -g pm2
```

### Step 3: Upload Your Application

#### Option A: Via Git (Recommended)

```bash
# On VPS, create directory
mkdir -p /var/www/gtm-match
cd /var/www/gtm-match

# Clone your repository (if pushed to GitHub)
git clone https://github.com/YOUR_USERNAME/gtm-match.git .

# Or initialize git and push from local
```

#### Option B: Via SFTP

1. **Using FileZilla or Cyberduck:**
   - Host: your-vps-ip-address
   - Protocol: SFTP
   - Port: 22
   - Username: root
   - Password: your-password

2. **Upload from local:**
   - Compress your project: `cd /Users/apple && tar -czf gtm-match.tar.gz gtm-match`
   - Upload `gtm-match.tar.gz` to `/var/www/`
   - Extract on VPS: `tar -xzf gtm-match.tar.gz`

#### Option C: Via SCP (Command Line)

```bash
# From your local Mac terminal
cd /Users/apple
tar -czf gtm-match.tar.gz gtm-match

# Upload to VPS
scp gtm-match.tar.gz root@your-vps-ip:/var/www/

# SSH into VPS and extract
ssh root@your-vps-ip
cd /var/www
tar -xzf gtm-match.tar.gz
cd gtm-match
```

### Step 4: Install Dependencies and Build

```bash
# On VPS, in project directory
cd /var/www/gtm-match

# Install dependencies
npm install --production

# Build the application
npm run build

# Test the build
npm start
# Visit http://your-vps-ip:3000 to verify
# Press Ctrl+C to stop
```

### Step 5: Configure PM2 to Keep App Running

```bash
# Start app with PM2
pm2 start npm --name "gtm-match" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on system boot
pm2 startup
# Run the command that PM2 outputs

# Check status
pm2 status
pm2 logs gtm-match

# Useful PM2 commands:
# pm2 restart gtm-match  # Restart app
# pm2 stop gtm-match     # Stop app
# pm2 delete gtm-match   # Remove from PM2
```

### Step 6: Configure Nginx as Reverse Proxy

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/gtm-match
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the configuration:

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/gtm-match /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### Step 7: Point Your Domain to Hostinger

1. **In Hostinger hPanel:**
   - Go to Domains
   - Click on your domain
   - Update DNS records:

```
Type: A
Name: @
Value: your-vps-ip-address
TTL: 14400

Type: A
Name: www
Value: your-vps-ip-address
TTL: 14400
```

2. **Wait for DNS propagation** (up to 24 hours, usually faster)

### Step 8: Set Up SSL Certificate (HTTPS)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose redirect HTTP to HTTPS

# Test auto-renewal
sudo certbot renew --dry-run

# SSL will auto-renew every 90 days
```

### Step 9: Configure Environment Variables

```bash
# Create .env.production file
cd /var/www/gtm-match
nano .env.production
```

Add your variables:
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com/api
# Add other variables as needed
```

Save and restart:
```bash
pm2 restart gtm-match
```

## Method 2: Using Hostinger's hPanel (If Available)

Some Hostinger plans have Node.js support in hPanel:

1. **Login to hPanel**
2. **Go to Advanced → Node.js**
3. **Create Node.js Application:**
   - Node.js version: 18.x
   - Application mode: Production
   - Application root: /public_html/gtm-match
   - Application startup file: server.js or npm start

4. **Upload files via File Manager or FTP**

5. **Install dependencies in hPanel terminal:**
```bash
npm install
npm run build
```

## Quick Deploy Script

Create this script on your local machine for easy updates:

```bash
# deploy.sh
#!/bin/bash

echo "🚀 Deploying GTM Match to Hostinger..."

# Build locally
echo "📦 Building application..."
npm run build

# Create tarball
echo "📦 Creating package..."
tar -czf gtm-match-build.tar.gz .next package.json package-lock.json public

# Upload to VPS
echo "📤 Uploading to VPS..."
scp gtm-match-build.tar.gz root@YOUR_VPS_IP:/var/www/gtm-match/

# Deploy on VPS
echo "🔧 Deploying on VPS..."
ssh root@YOUR_VPS_IP << 'ENDSSH'
cd /var/www/gtm-match
tar -xzf gtm-match-build.tar.gz
npm install --production
pm2 restart gtm-match
ENDSSH

echo "✅ Deployment complete!"
echo "🌐 Visit: https://your-domain.com"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Run it:
```bash
./deploy.sh
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 PID

# Or use a different port
# Update package.json:
"start": "next start -p 3001"
```

### App Not Starting

```bash
# Check PM2 logs
pm2 logs gtm-match

# Check build errors
cd /var/www/gtm-match
npm run build

# Check Node version
node --version  # Should be 18+
```

### Nginx Not Working

```bash
# Check Nginx status
sudo systemctl status nginx

# Check error logs
sudo tail -f /var/log/nginx/error.log

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Domain Not Pointing

```bash
# Check DNS propagation
nslookup your-domain.com

# Or visit: https://www.whatsmydns.net/
```

### Out of Memory

```bash
# Add swap space (if VPS has limited RAM)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## Monitoring & Maintenance

### Check App Status

```bash
pm2 status
pm2 monit  # Real-time monitoring
```

### View Logs

```bash
pm2 logs gtm-match
pm2 logs gtm-match --lines 100  # Last 100 lines
```

### Update Application

```bash
cd /var/www/gtm-match
git pull  # If using Git
npm install
npm run build
pm2 restart gtm-match
```

### Backup

```bash
# Create backup
cd /var/www
tar -czf gtm-match-backup-$(date +%Y%m%d).tar.gz gtm-match

# Store backups
mkdir -p /root/backups
mv gtm-match-backup-*.tar.gz /root/backups/
```

## Performance Optimization

### Enable Nginx Caching

Add to Nginx config:

```nginx
# Cache static files
location /_next/static {
    proxy_pass http://localhost:3000;
    proxy_cache_valid 200 60m;
    add_header Cache-Control "public, max-age=31536000, immutable";
}

location /images {
    proxy_pass http://localhost:3000;
    proxy_cache_valid 200 24h;
    add_header Cache-Control "public, max-age=86400";
}
```

### Enable Gzip Compression

Add to Nginx config:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

## Security

### Firewall Setup

```bash
# Install UFW
sudo apt install ufw -y

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Update Regularly

```bash
# System updates
sudo apt update && sudo apt upgrade -y

# Node.js security updates
npm audit fix
```

## Cost Breakdown

Hostinger VPS pricing (approximate):
- VPS 1: $4.99/month (1 vCPU, 4GB RAM)
- VPS 2: $8.99/month (2 vCPU, 8GB RAM)
- VPS 3: $15.99/month (3 vCPU, 12GB RAM)

**Recommended:** VPS 1 or VPS 2 for GTM Match

## Support

- Hostinger Support: https://www.hostinger.com/contact
- Live Chat: Available in hPanel
- Knowledge Base: https://support.hostinger.com

## Summary - Quick Steps

```bash
# 1. SSH into VPS
ssh root@your-vps-ip

# 2. Install Node.js & PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# 3. Upload & extract app
cd /var/www
# Upload gtm-match.tar.gz via SFTP
tar -xzf gtm-match.tar.gz
cd gtm-match

# 4. Install & build
npm install --production
npm run build

# 5. Start with PM2
pm2 start npm --name "gtm-match" -- start
pm2 save
pm2 startup

# 6. Install & configure Nginx
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/gtm-match
# Add configuration
sudo ln -s /etc/nginx/sites-available/gtm-match /etc/nginx/sites-enabled/
sudo systemctl restart nginx

# 7. Setup SSL
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com

# 8. Done! Visit https://your-domain.com
```

---

**Need help?** Check the troubleshooting section or contact Hostinger support.
