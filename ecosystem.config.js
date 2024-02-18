module.exports = {
  apps: [
    {
      name: "folkmoz-ai",
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      autorestart: true,
    },
  ],
};
