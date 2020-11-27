module.exports = {
    apps: [{
        name: "adonis-url-shortner",
        script: "./server.js",
        env: {
            NODE_ENV: "production",
            HOST: "0.0.0.0",
            PORT: 3333,
            APP_NAME: "adonis_url_shortner",
            APP_URL: "http://${HOST}:${PORT}",
            CACHE_VIEWS: "false",
            DB_CONNECTION: "pg",
            DB_HOST: "127.0.0.1",
            DB_PORT: "5432",
            DB_USER: "postgres",
            DB_PASSWORD: "1234",
            DB_DATABASE: "adonis",
            HASH_DRIVER: "bcrypt",
        },
    }]
}
