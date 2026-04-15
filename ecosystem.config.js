module.exports = {
  apps: [
    {
      name: "subtech-earth-website",
      script: ".next/standalone/server.js",
      env: {
        PORT: 3001,
        NODE_ENV: "production",
      },
      autorestart: true,
      max_memory_restart: "500M",
      watch: false,
    },
  ],
};
