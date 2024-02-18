module.exports = {
  apps: [
    {
      name: "folkmoz-ai",
      script: "./node_modules/next/dist/bin/build",
      args: "start",
      autorestart: true,
    },
  ],
};
