# 🚀 Hostinger Quick Start Guide

Deploy your GTM Match app to Hostinger in under 10 minutes.

## Before You Start

### 1. Check Your Hostinger Plan

Login to [Hostinger hPanel](https://hpanel.hostinger.com) and check:

- ✅ **You have VPS or Cloud Hosting** → Continue with this guide
- ❌ **You have Shared Hosting** → Use Vercel instead (free, easier)

### 2. Get Your VPS Details

From Hostinger hPanel, note:
- **VPS IP Address**: (e.g., 192.168.1.100)
- **SSH Username**: Usually `root`
- **SSH Password**: Found in VPS dashboard

## Quick Deploy (Automated)

### One-Command Deploy

```bash
cd /Users/apple/gtm-match
./deploy-hostinger.sh YOUR_VPS_IP
```

Example:
```bash
./deploy-hostinger.sh 192.168.1.100
```

**That's it!** The script will:
1. Build your app
2. Upload to VPS
3. Install dependencies
4. Start the server

Your app will be live at: `http://YOUR_VPS_IP:3000`

## Manual Setup (First Time Only)

If the automated script doesn't work, follow these steps:

### 1. Connect to Your VPS

```bash
ssh root@YOUR_VPS_IP
# Enter password when prompted
```

### 2. Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

### 3. Upload Your App

**Option A - Using SFTP (Easy):**
1. Download [FileZilla](https://filezilla-project.org/)
2. Connect:
   - Host: `sftp://YOUR_VPS_IP`
   - Username: `root`
   - Password: Your VPS password
   - Port: `22`
3. Upload entire `gtm-match` folder to `/var/www/`

**Option B - Using Terminal:**
```bash
# On your Mac
cd /Users/apple
tar -czf gtm-match.tar.gz gtm-match
scp gtm-match.tar.gz root@YOUR_VPS_IP:/var/www/

# On VPS
ssh root@YOUR_VPS_IP
cd /var/www
tar -xzf gtm-match.tar.gz
```

### 4. Build and Start

```bash
# On VPS
cd /var/www/gtm-match
npm install
npm run build
pm2 start npm --name "gtm-match" -- start
pm2 save
```

### 5. Test It

Visit: `http://YOUR_VPS_IP:3000`

If it works, you're done! 🎉

## Set Up Your Domain (Optional but Recommended)

### 1. Install Nginx

```bash
# On VPS
sudo apt install nginx -y
```

### 2. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/gtm-match
```

Paste this (replace `yourdomain.com`):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save (Ctrl+X, Y, Enter)

### 3. Enable Configuration

```bash
sudo ln -s /etc/nginx/sites-available/gtm-match /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Point Your Domain

In Hostinger hPanel → Domains → DNS:

```
Type: A Record
Name: @
Value: YOUR_VPS_IP

Type: A Record
Name: www
Value: YOUR_VPS_IP
```

Wait 5-30 minutes for DNS propagation.

### 5. Add SSL (HTTPS)

```bash
# On VPS
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow prompts, choose redirect HTTP to HTTPS.

**Done!** Visit: `https://yourdomain.com` 🎉

## Update Your App

When you make changes:

```bash
# On your Mac
cd /Users/apple/gtm-match
./deploy-hostinger.sh YOUR_VPS_IP
```

Or manually:
```bash
# On VPS
cd /var/www/gtm-match
git pull  # If using Git
npm install
npm run build
pm2 restart gtm-match
```

## Troubleshooting

### Can't connect via SSH

- Check VPS IP address is correct
- Check password is correct
- Try resetting password in hPanel

### Port 3000 doesn't work

```bash
# On VPS
pm2 logs gtm-match
```

Look for errors in logs.

### Build fails

```bash
# On VPS
cd /var/www/gtm-match
npm install
npm run build
```

Fix any errors shown.

### Nginx shows error

```bash
# Check if Nginx is running
sudo systemctl status nginx

# Check logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

## Useful Commands

```bash
# View app status
pm2 status

# View app logs
pm2 logs gtm-match

# Restart app
pm2 restart gtm-match

# Stop app
pm2 stop gtm-match

# Check Nginx status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx
```

## Cost

Hostinger VPS pricing:
- **VPS 1**: $4.99/month (Good for small sites)
- **VPS 2**: $8.99/month (Recommended for GTM Match)
- **VPS 3**: $15.99/month (For high traffic)

## Need Help?

- 📖 **Full Guide**: `HOSTINGER_DEPLOYMENT.md`
- 💬 **Hostinger Support**: Live chat in hPanel
- 🎥 **Video Tutorial**: Search "Deploy Next.js to Hostinger VPS" on YouTube

## Alternative: Use Vercel (Easier)

If Hostinger VPS is too complex, consider Vercel:

```bash
npm install -g vercel
cd /Users/apple/gtm-match
vercel --prod
```

Vercel is:
- ✅ Free
- ✅ Easier to use
- ✅ Auto-SSL
- ✅ Auto-deploy on Git push
- ✅ Built for Next.js

---

**Quick Deploy**: `./deploy-hostinger.sh YOUR_VPS_IP`
