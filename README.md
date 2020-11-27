# BACKEND CHALLANGE: URL shortener
## Goal: To create an API able to:
1. POST a long URL and shorten it
2. GET a short URL and redirect it

## Features:
* Written in Node.js
* Persists in PostgreSQL
* Has input validations
* Has coverage tests

## SETUP
1. Create a database called adonis
2. Copy and rename ecosystem.config.example.js to ecosystem.config.example.js
3. Copy and rename config.example to config
4. Configure ecosystem.config.js as fit for production environment
4. Configure .env as fit so you can run migrations
5. Change configurations under config folder (optional)
6. Install dependencies with `npm i`
7. Run database migrations with `npx node ace migration:run`

## DEV SETUP
1. Create a database called test
2. Copy and rename .env.example to .env.testing
3. Configure .env.testing with `NODE_ENV=testing`

## TESTING AND COVERAGE REPORT
* run all tests
```
npm run test
```
* run all tests with coverage output
```
npm run coverage
```
Open the file coverage/index.html in your browser to read full coverage report

## RUNNING
Production
```
npx pm2 start
````
Development
```
npm run dev
````

## LIST endpoints
```
npm run docs
```