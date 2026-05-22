module.exports = {
    apps: [
        {
            name: "backend",
            script: "npm",
            args: "start",

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