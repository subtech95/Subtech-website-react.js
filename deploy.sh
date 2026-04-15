#!/bin/bash
set -e

echo "========================================="
echo "  Subtech Earth - Deployment Script"
echo "  Target: earth.subtech.in"
echo "========================================="
echo ""

# Step 1: Pull latest code
echo "[1/5] Pulling latest code from git..."
git pull origin main

# Step 2: Install dependencies
echo "[2/5] Installing dependencies..."
npm install --legacy-peer-deps

# Step 3: Build
echo "[3/5] Building production bundle..."
NODE_ENV=production npm run build

# Step 4: Copy static files into standalone output
echo "[4/5] Copying static assets to standalone..."
cp -r .next/static .next/standalone/.next/static
if [ -d "public" ]; then
  cp -r public .next/standalone/public
fi

# Step 5: Restart PM2
echo "[5/5] Restarting PM2 process..."
pm2 restart ecosystem.config.js --update-env 2>/dev/null || pm2 start ecosystem.config.js

echo ""
echo "========================================="
echo "  Deployment complete!"
echo "  Site: https://earth.subtech.in"
echo "  PM2:  pm2 status"
echo "  Logs: pm2 logs subtech-earth-website"
echo "========================================="
