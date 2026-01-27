# GTM Match - Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- [ ] All code committed to Git
- [ ] A GitHub/GitLab/Bitbucket account
- [ ] Environment variables documented
- [ ] Production-ready database (if needed)
- [ ] Domain name (optional)

## 🚀 Method 1: Vercel (Recommended)

Vercel is the easiest and best option for Next.js applications.

### Quick Deploy with Vercel CLI

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy from project root:**
```bash
cd /Users/apple/gtm-match
vercel
```

4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? (select your account)
   - Link to existing project? `N`
   - What's your project's name? `gtm-match`
   - In which directory is your code located? `./`
   - Want to override settings? `N`

5. **Deploy to production:**
```bash
vercel --prod
```

### Deploy with Vercel Dashboard

1. **Push to Git:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/gtm-match.git
git push -u origin main
```

2. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Import your repository
   - Configure project (auto-detected)
   - Add environment variables (if needed)
   - Click "Deploy"

3. **Your site will be live at:**
   - `https://gtm-match.vercel.app`
   - Or your custom domain

### Configure Environment Variables

In Vercel dashboard, go to: **Project Settings → Environment Variables**

Add these variables:
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.gtmmatch.com

# Authentication (when implementing real auth)
NEXTAUTH_URL=https://gtm-match.vercel.app
NEXTAUTH_SECRET=your-secret-here

# Database (when implementing)
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# File Upload
NEXT_PUBLIC_UPLOAD_URL=https://your-cdn.com

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📦 Method 2: Netlify

Another excellent option for Next.js applications.

### Deploy to Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build the project:**
```bash
npm run build
```

3. **Deploy:**
```bash
netlify deploy --prod
```

### Or use Netlify Dashboard:

1. Go to https://app.netlify.com
2. Drag and drop your `.next` folder
3. Or connect your Git repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

## ☁️ Method 3: AWS (Advanced)

For more control and scalability.

### Deploy to AWS Amplify

1. **Install AWS Amplify CLI:**
```bash
npm install -g @aws-amplify/cli
amplify configure
```

2. **Initialize Amplify:**
```bash
amplify init
```

3. **Add hosting:**
```bash
amplify add hosting
```

4. **Publish:**
```bash
amplify publish
```

### Deploy to AWS EC2 (Manual)

1. **Build the application:**
```bash
npm run build
```

2. **Upload to EC2 instance**

3. **Install Node.js on EC2:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Install PM2:**
```bash
sudo npm install -g pm2
```

5. **Run the app:**
```bash
cd /path/to/gtm-match
npm install --production
pm2 start npm --name "gtm-match" -- start
pm2 save
pm2 startup
```

6. **Configure Nginx as reverse proxy:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

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

## 🐳 Method 4: Docker Deployment

Deploy using Docker containers.

### Create Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

### Build and run:

```bash
# Build image
docker build -t gtm-match .

# Run container
docker run -p 3000:3000 gtm-match
```

### Deploy to Docker Hub + Cloud:

```bash
# Tag and push
docker tag gtm-match your-username/gtm-match:latest
docker push your-username/gtm-match:latest

# Deploy on any cloud provider that supports Docker
```

## 🌍 Method 5: DigitalOcean App Platform

Simple and affordable hosting.

1. **Create DigitalOcean account**
2. **Create new app**
3. **Connect GitHub repository**
4. **Configure:**
   - Type: Web Service
   - Branch: main
   - Build command: `npm run build`
   - Run command: `npm start`
5. **Deploy**

## 🔧 Pre-Deployment Checklist

### 1. Update next.config.ts for Production

```typescript
const nextConfig: NextConfig = {
  images: {
    domains: ['api.dicebear.com'], // Add your image domains
    formats: ['image/avif', 'image/webp'],
  },
  // ... rest of config
};
```

### 2. Set up .gitignore

Ensure these are ignored:
```
# .gitignore
.env
.env.local
.env.production
.next
node_modules
.vercel
```

### 3. Environment Variables

Create `.env.example`:
```env
NEXT_PUBLIC_API_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
DATABASE_URL=
NEXT_PUBLIC_UPLOAD_URL=
NEXT_PUBLIC_GA_ID=
```

### 4. Build Test Locally

```bash
npm run build
npm start
```

Verify it works at http://localhost:3000

### 5. Performance Optimization

Already configured in your project:
- ✅ Image optimization
- ✅ Package import optimization
- ✅ React Strict Mode
- ✅ Compression enabled

## 🌐 Custom Domain Setup

### For Vercel:

1. Go to Project Settings → Domains
2. Add your domain (e.g., `gtmmatch.com`)
3. Update DNS records at your domain registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### For Other Platforms:

Follow their specific DNS configuration instructions.

## 📊 Post-Deployment

### 1. Monitor Application

- Set up error tracking (Sentry)
- Configure analytics (Google Analytics)
- Monitor performance (Vercel Analytics)

### 2. Enable HTTPS

Most platforms (Vercel, Netlify) auto-provision SSL certificates.

### 3. Set up CI/CD

Push to `main` branch = automatic deployment

### 4. Database Setup (When Ready)

When you integrate a backend:
- Set up PostgreSQL/MongoDB
- Run migrations
- Update environment variables

## 🚨 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

- Ensure `NEXT_PUBLIC_` prefix for client-side variables
- Restart development server after changes
- Check Vercel dashboard for correct values

### 404 Errors After Deployment

- Ensure all dynamic routes are working
- Check `next.config.ts` settings
- Verify API routes are deployed

## 💰 Cost Comparison

| Platform | Free Tier | Paid Plans |
|----------|-----------|------------|
| Vercel | 100GB bandwidth, unlimited projects | $20/mo for Pro |
| Netlify | 100GB bandwidth, 300 build minutes | $19/mo for Pro |
| AWS | First 12 months free (limited) | Pay as you go |
| DigitalOcean | N/A | $5/mo+ |
| Render | 750 hours/mo free | $7/mo+ |

## 📚 Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Next.js Guide](https://docs.netlify.com/frameworks/next-js/)
- [AWS Amplify Docs](https://docs.amplify.aws/)

## 🎉 Quick Start (Fastest)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Navigate to project
cd /Users/apple/gtm-match

# 3. Deploy
vercel --prod

# Done! Your site is live 🚀
```

---

**Recommended**: Use Vercel for the easiest deployment experience with Next.js.
