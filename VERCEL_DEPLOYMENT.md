# 🚀 Deploy GTM Match to Vercel - Step by Step

Follow these steps exactly to deploy your app to Vercel.

## Step 1: Prepare Your Code (Git)

First, we need to commit all your code to Git.

```bash
cd /Users/apple/gtm-match

# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: GTM Match application"
```

## Step 2: Create GitHub Repository

### Option A: Using GitHub Desktop (Easiest)
1. Download GitHub Desktop: https://desktop.github.com
2. Open GitHub Desktop
3. Click "Add" → "Add Existing Repository"
4. Choose `/Users/apple/gtm-match`
5. Click "Publish repository"
6. Name it: `gtm-match`
7. Make it Public or Private (your choice)
8. Click "Publish Repository"

### Option B: Using GitHub Website
1. Go to https://github.com/new
2. Repository name: `gtm-match`
3. Description: "GTM Match - Community marketplace for GTM professionals"
4. Choose Public or Private
5. Do NOT initialize with README (we already have code)
6. Click "Create repository"

7. Copy the commands shown and run in terminal:
```bash
git remote add origin https://github.com/YOUR_USERNAME/gtm-match.git
git branch -M main
git push -u origin main
```

## Step 3: Sign Up for Vercel

1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Complete sign up

## Step 4: Deploy via Vercel Dashboard (Easiest Method)

### 4.1 Import Project
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Find your `gtm-match` repository
4. Click "Import"

### 4.2 Configure Project
Vercel auto-detects Next.js settings, but verify:

- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (leave as is)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 4.3 Environment Variables (Optional)
If you need environment variables (you don't right now), click "Environment Variables" and add them.

### 4.4 Deploy!
1. Click "Deploy"
2. Wait 2-3 minutes while Vercel:
   - Installs dependencies
   - Builds your app
   - Deploys to global CDN
3. You'll see confetti when done! 🎉

### 4.5 Visit Your Live Site
Your site is now live at:
- `https://gtm-match-username.vercel.app`
- Or the URL shown in the dashboard

## Alternative: Deploy via CLI (Advanced)

If you prefer command line:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
cd /Users/apple/gtm-match
vercel

# Answer the prompts:
# Set up and deploy? Y
# Which scope? (select your account)
# Link to existing project? N
# What's your project's name? gtm-match
# In which directory is your code located? ./
# Want to override the settings? N

# Deploy to production
vercel --prod
```

## Step 5: Custom Domain (Optional)

### Add Your Own Domain

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Enter your domain (e.g., `gtmmatch.com`)
4. Click "Add"

5. Update DNS at your domain registrar:

**For Apex Domain (gtmmatch.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For WWW:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

6. Wait for DNS propagation (5-30 minutes)
7. Vercel automatically provisions SSL certificate

## Step 6: Auto-Deploy on Git Push

Now whenever you push code to GitHub, Vercel automatically deploys!

```bash
# Make changes to your code
# Then:
git add .
git commit -m "Update feature X"
git push

# Vercel automatically deploys in ~2 minutes
```

## Features You Get with Vercel

✅ **Free Forever** (for hobby projects)
✅ **Automatic HTTPS/SSL** (no setup needed)
✅ **Global CDN** (fast worldwide)
✅ **Auto-deploy** on Git push
✅ **Preview URLs** for each branch
✅ **Analytics** (built-in)
✅ **100GB bandwidth/month** (free tier)
✅ **Unlimited projects**
✅ **Custom domains** (free)
✅ **Serverless functions** (if needed later)

## Troubleshooting

### Build Fails

**Check build logs** in Vercel dashboard:
1. Go to your deployment
2. Click "View Build Logs"
3. Look for errors

**Common fixes:**
```bash
# Test build locally first
npm run build

# If it works locally but fails on Vercel:
# - Check Node.js version (set in Vercel dashboard)
# - Check environment variables
```

### 404 Errors

If you get 404s on certain routes:
- Ensure all dynamic routes are in the `/app` directory
- Check that file names match Next.js conventions

### Images Not Loading

If external images don't load, add domains to `next.config.ts`:

```typescript
images: {
  domains: ['api.dicebear.com'], // Add your domains
}
```

Then redeploy:
```bash
git add next.config.ts
git commit -m "Add image domains"
git push
```

## Managing Your Deployment

### View Deployments
- Dashboard: https://vercel.com/dashboard
- See all deployments, logs, analytics

### Rollback
1. Go to project → Deployments
2. Find previous deployment
3. Click "..." → "Promote to Production"

### Environment Variables
1. Project Settings → Environment Variables
2. Add variables for Production/Preview/Development
3. Redeploy for changes to take effect

### Team/Collaboration
- Invite team members in Project Settings
- They can view deployments and logs

## Monitoring

### Analytics
- Go to project → Analytics
- See page views, top pages, countries

### Real-time Logs
```bash
vercel logs gtm-match --follow
```

### Performance
- Go to project → Speed Insights (on Pro plan)
- See Core Web Vitals

## Costs

### Free Tier (Hobby)
- **Price**: $0/month
- **Bandwidth**: 100GB/month
- **Build Time**: 100 hours/month
- **Serverless Functions**: 100GB-Hours/month
- **Perfect for**: Personal projects, demos, portfolios

### Pro Tier
- **Price**: $20/month
- **Bandwidth**: 1TB/month
- **Everything unlimited**
- **Team collaboration**
- **Priority support**

**For GTM Match**: Free tier is more than enough to start!

## Next Steps After Deployment

1. ✅ **Test your live site** thoroughly
2. ✅ **Share the URL** with friends/testers
3. ✅ **Set up custom domain** (optional)
4. ✅ **Add Google Analytics** (when ready)
5. ✅ **Connect to backend API** (when ready)
6. ✅ **Set up database** (when ready)

## Quick Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm deployment-url

# Pull environment variables
vercel env pull

# Help
vercel --help
```

## Support

- **Documentation**: https://vercel.com/docs
- **Help**: https://vercel.com/help
- **Community**: https://github.com/vercel/vercel/discussions
- **Twitter**: @vercel

---

**Ready to deploy? Let's do it!** 🚀

The easiest way:
1. Push code to GitHub
2. Import on Vercel
3. Click Deploy
4. Done!
