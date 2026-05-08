module.exports = {
  apps: [
    {
      name: "subtech-earth-website",
      script: ".next/standalone/server.js",
      env: {
        // 3000 is used by subtech-ops, 3001 by subtech-crm on this droplet,
        // so we keep earth on 3002. If you move servers, this is the only
        // place to change.
        PORT: 3002,
        NODE_ENV: "production",
      },
      autorestart: true,
      max_memory_restart: "500M",
      watch: false,
    },
  ],
};
