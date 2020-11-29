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
5. Configure .env as fit so you can run migrations
6. Install dependencies with `npm i`
7. Run database migrations with `npx node ace migration:run`
8. Rollback migrations if necessary `npx node ace migration:rollback`

### NOTES
1. The only environment you are likely to change are `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`
2. Adonis reads from .env to run migrations from a script outside server runtime. Therefore, both .env and ecosystem.config.js have to have access to the database.
3. Logs go to a log file. See `config/app.js` if you which to log to console instead
4. CORS is allowing "current request origin". See `config/cors.js` if necessary to change.

## DEV SETUP
1. Create a database called test
2. Copy and rename .env.example to .env.testing
3. Configure .env.testing with database credentials and `NODE_ENV=testing`

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

Either add pm2 globally or run it from npx
```
npm -g install pm2
```
Run production
```
pm2 start
````
Development
```
npm run dev
````

## LIST endpoints
This command will provide a list of all endpoints / HTTP verbs available
```
npm run docs
```

## Known issues / limitations
1. Trying to access a invalid route (404) is likely to give an error instead.
2. Adonis test is not really able to check the redirect status 302 and which url it actually went. This seems faulty from Adonis.
3. Adonis is tightly coupled with it dependencies and may face some issues (see 1) because it's authentication models are missing from database.
