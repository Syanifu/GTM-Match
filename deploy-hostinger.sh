#!/bin/bash

# GTM Match - Hostinger Deployment Script
# Make executable with: chmod +x deploy-hostinger.sh
# Run with: ./deploy-hostinger.sh

echo "🚀 GTM Match - Hostinger Deployment"
echo "===================================="
echo ""

# Check if VPS IP is provided
if [ -z "$1" ]; then
    echo "❌ Error: VPS IP address required"
    echo "Usage: ./deploy-hostinger.sh YOUR_VPS_IP"
    echo "Example: ./deploy-hostinger.sh 192.168.1.100"
    exit 1
fi

VPS_IP=$1
PROJECT_NAME="gtm-match"
REMOTE_DIR="/var/www/$PROJECT_NAME"

echo "📋 Configuration:"
echo "   VPS IP: $VPS_IP"
echo "   Remote Directory: $REMOTE_DIR"
echo ""

# Step 1: Build locally
echo "📦 Step 1/4: Building application locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi

echo "✅ Build successful"
echo ""

# Step 2: Create deployment package
echo "📦 Step 2/4: Creating deployment package..."
tar -czf ${PROJECT_NAME}-deploy.tar.gz \
    .next \
    public \
    package.json \
    package-lock.json \
    next.config.ts \
    tsconfig.json

echo "✅ Package created: ${PROJECT_NAME}-deploy.tar.gz"
echo ""

# Step 3: Upload to VPS
echo "📤 Step 3/4: Uploading to VPS..."
echo "   (You may be prompted for SSH password)"

scp ${PROJECT_NAME}-deploy.tar.gz root@${VPS_IP}:/tmp/

if [ $? -ne 0 ]; then
    echo "❌ Upload failed! Check your VPS IP and SSH access."
    exit 1
fi

echo "✅ Upload successful"
echo ""

# Step 4: Deploy on VPS
echo "🔧 Step 4/4: Deploying on VPS..."
echo "   (Connecting to VPS...)"

ssh root@${VPS_IP} << ENDSSH
    set -e

    echo "Creating directory structure..."
    mkdir -p ${REMOTE_DIR}
    cd ${REMOTE_DIR}

    echo "Extracting files..."
    tar -xzf /tmp/${PROJECT_NAME}-deploy.tar.gz

    echo "Installing dependencies..."
    npm install --production --silent

    echo "Checking if PM2 is installed..."
    if ! command -v pm2 &> /dev/null; then
        echo "Installing PM2..."
        npm install -g pm2
    fi

    echo "Starting/Restarting application with PM2..."
    if pm2 list | grep -q "${PROJECT_NAME}"; then
        pm2 restart ${PROJECT_NAME}
    else
        pm2 start npm --name "${PROJECT_NAME}" -- start
        pm2 save
    fi

    echo "Cleaning up..."
    rm /tmp/${PROJECT_NAME}-deploy.tar.gz

    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📊 Application Status:"
    pm2 status

    echo ""
    echo "🌐 Access your application:"
    echo "   http://${VPS_IP}:3000"
    echo ""
    echo "💡 Useful commands:"
    echo "   pm2 logs ${PROJECT_NAME}  - View logs"
    echo "   pm2 restart ${PROJECT_NAME}  - Restart app"
    echo "   pm2 stop ${PROJECT_NAME}  - Stop app"
ENDSSH

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed on VPS"
    exit 1
fi

# Cleanup local package
rm ${PROJECT_NAME}-deploy.tar.gz

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "Next steps:"
echo "1. Visit http://${VPS_IP}:3000 to test"
echo "2. Set up Nginx (see HOSTINGER_DEPLOYMENT.md)"
echo "3. Configure your domain"
echo "4. Set up SSL certificate"
echo ""
echo "📚 Full guide: HOSTINGER_DEPLOYMENT.md"
