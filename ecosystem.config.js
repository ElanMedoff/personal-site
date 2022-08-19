module.exports = {
  apps: [
    {
      name: "next",
      script: "/home/elan/.nvm/versions/node/v16.16.0/bin/pm2",
      args: "run prod",
    },
  ],
};
