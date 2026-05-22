module.exports = {
    apps: [
        {
            name: "backend",
            script: "./index.js",

            instances: 1,
            exec_mode: "fork",

            watch: false,

            autorestart: true,
            max_restarts: 10,

            restart_delay: 5000,

            env: {
                NODE_ENV: "production",
                PORT: 5000
            }
        }
    ]
}