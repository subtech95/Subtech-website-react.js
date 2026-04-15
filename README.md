# Subtech Website — earth.subtech.in

Industrial electrical automation website for Subtech. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Local Development

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build:prod
npm run start:prod
```

---

## Deployment to earth.subtech.in

### 1. SSH into the server

```bash
ssh user@<SERVER_IP>
cd /var/www/subtech-earth
```

### 2. Run the deploy script

```bash
bash deploy.sh
```

### 3. Verify

```bash
pm2 status
pm2 logs subtech-earth-website
```

---

## Server Setup (First Time Only)

### Prerequisites on the server

```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Certbot
sudo apt install -y certbot python3-certbot-nginx
```

### Clone and deploy

```bash
cd /var/www
git clone <REPO_URL> subtech-earth
cd subtech-earth
bash deploy.sh
```

---

## DNS Setup (Neeraj)

Add a DNS **A record** for `earth.subtech.in` pointing to the server IP address.

## Nginx Setup (Neeraj)

```bash
# Copy the nginx config
sudo cp nginx.conf /etc/nginx/sites-available/earth.subtech.in

# Create symlink to enable the site
sudo ln -s /etc/nginx/sites-available/earth.subtech.in /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## SSL Certificate (After DNS is live)

```bash
sudo certbot --nginx -d earth.subtech.in
```

This will automatically configure HTTPS with a free Let's Encrypt certificate that auto-renews.

---

## Environment Variables

Create `.env.production` on the server:

```
NEXT_PUBLIC_CRM_URL=https://crm.subtech.in
NEXT_PUBLIC_SITE_URL=https://earth.subtech.in
```

## Useful Commands

| Command | Description |
|---------|-------------|
| `pm2 status` | Check if the site is running |
| `pm2 logs subtech-earth-website` | View live logs |
| `pm2 restart subtech-earth-website` | Restart the site |
| `pm2 stop subtech-earth-website` | Stop the site |
| `bash deploy.sh` | Full redeploy |
