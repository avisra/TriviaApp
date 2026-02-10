# 🚀 Quick Deployment Guide - Azure Static Web Apps

This guide will help you deploy the Trivia Time app to Azure Static Web Apps with CI/CD in about 10 minutes.

## Prerequisites

✅ Azure account (sign up for free at https://azure.com/free)  
✅ GitHub account  
✅ This code pushed to a GitHub repository

## Step 1: Push to GitHub (if not already done)

```bash
# Initialize git if needed
git init
git add .
git commit -m "Initial commit - Trivia Time PWA"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/trivia-app.git
git branch -M main
git push -u origin main
```

## Step 2: Create Azure Static Web App

1. **Open Azure Portal**: https://portal.azure.com

2. **Create Resource**:
   - Click "+ Create a resource"
   - Search for "Static Web App"
   - Click "Create"

3. **Fill in Details**:
   ```
   Subscription: Your Azure subscription
   Resource Group: Create new → "trivia-app-rg"
   Name: trivia-time (or your choice)
   Plan type: Free ⭐
   Region: Choose closest (e.g., East US 2)
   ```

4. **GitHub Integration**:
   - Source: GitHub
   - Click "Sign in with GitHub" and authorize
   - Organization: Your GitHub username
   - Repository: Select your trivia app repo
   - Branch: main

5. **Build Configuration**:
   ```
   Build Presets: React
   App location: /
   Api location: (leave empty)
   Output location: dist
   ```

6. **Review + Create**:
   - Click "Review + create"
   - Click "Create"
   - Wait ~1 minute for deployment

## Step 3: Watch Deployment

1. **GitHub Actions**:
   - Go to your GitHub repo
   - Click "Actions" tab
   - Watch the workflow run (takes ~2-3 minutes)

2. **Get Your URL**:
   - Once complete, go back to Azure Portal
   - Open your Static Web App resource
   - Copy the URL (looks like: `https://happy-xxx-123.azurestaticapps.net`)

3. **Test Your App**:
   - Visit the URL
   - Test the PWA: Install on mobile, test offline mode
   - Share with friends! 🎉

## What Just Happened?

✅ Azure created a Static Web App resource (Free tier)  
✅ GitHub Actions workflow was added to your repo  
✅ App was built and deployed automatically  
✅ You got a free HTTPS URL with auto-SSL  
✅ CI/CD is configured - every push to `main` triggers deployment  
✅ Pull requests get preview environments automatically  

## Next Steps

### Add Custom Domain (Optional)

1. In Azure Portal → Your Static Web App → "Custom domains"
2. Click "Add"
3. Follow wizard to add your domain
4. Azure provides free SSL certificate

### Monitor Usage

- Azure Portal → Your Static Web App → "Metrics"
- View bandwidth, requests, errors
- Free tier includes 100 GB/month bandwidth

### Future Deployments

Just push to main:
```bash
git add .
git commit -m "Added more trivia questions"
git push origin main
```

GitHub Actions automatically builds and deploys! 🚀

## Cost Breakdown

**Azure Static Web Apps Free Tier:**
- ✅ FREE hosting
- ✅ FREE 100 GB bandwidth/month
- ✅ FREE SSL certificate
- ✅ FREE custom domain support
- ✅ FREE GitHub Actions integration
- ✅ FREE global CDN

**This app should stay in free tier unless you have massive traffic!**

## Troubleshooting

### Deployment Failed?
- Check GitHub Actions logs for errors
- Verify `npm run build` works locally
- Ensure `package.json` has correct scripts

### 404 Errors?
- Check `staticwebapp.config.json` exists in root
- Should redirect all routes to index.html for SPA

### PWA Not Installing?
- PWA requires HTTPS (Azure provides automatically)
- Check manifest.webmanifest is accessible
- Clear cache and try again

### Still Stuck?
- Check Azure logs: Portal → Static Web App → "Log stream"
- Review GitHub Actions workflow output
- Ensure all files committed and pushed

## Support

- Azure Static Web Apps Docs: https://docs.microsoft.com/azure/static-web-apps/
- GitHub Actions: https://github.com/features/actions
- Issues: Open an issue in your GitHub repo

---

Enjoy your deployed Trivia Time app! 🎮🎉
