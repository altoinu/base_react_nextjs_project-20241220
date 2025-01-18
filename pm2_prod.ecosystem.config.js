module.exports = {
  apps: [
    {
      name: "base_react_nextjs_project-20241220",

      // "npm run start" from pm2 ecosystem file doesn't work,
      // causes infinite immediate restarts
      //script: "npm",
      //args: "run start",
      // ...but directly calling "next start" works
      script: "./node_modules/.bin/next",
      args: "start",

      exec_mode: "cluster",
      instances: 0,

      node_args: [
        //"--inspect"
        //"--debug-port=6000",
        //"--inspect=6000"
        //"--max_old_space_size=8192"
        //"--max_old_space_size=4096"
      ],
      //max_memory_restart: "4G", // Restart if using more than 4GB of RAM

      //"watch": false,
      //"ignore_watch": [],

      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
