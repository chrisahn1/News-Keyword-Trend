require('dotenv').config();
const express = require('express');
const argon2 = require('argon2');
const http = require('http');
const cors = require('cors');
const app = express();
// const path = require('path');
// const reactStaticDir = path.join(__dirname, '../client/build');
// app.use(express.static(reactStaticDir));

// app.use(
//   cors({
//     credentials: true,
//     origin: 'http://localhost:3001',
//   })
// );
app.use(express.json());

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
//packagejson client
// "type": "module",
// "scripts": {
//     "dev": "vite",
//     "build": "tsc && vite build",
//     "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
//     "preview": "vite preview"
//   },

//packagejson server
// "type": "module",
//   "main": "server.js",
// "scripts": {
//     "start": "tsx server.ts",
//     "dev": "tsx watch server.ts",
//     "lint": "eslint . --ext ts,js --report-unused-disable-directives --max-warnings 0"
//   },

//packagejson
// "scripts": {
//     "start": "NODE_ENV=production npm start --prefix server",
//     "build": "npm run build --prefix client",
//     "db:import": "sh database/import.sh",
//     "dev:client": "npm run dev --prefix client",
//     "dev:server": "npm run dev --prefix server",
//     "dev": "npm-run-all --parallel --print-label dev:*",
//     "install:client": "npm install --prefix client",
//     "install:server": "npm install --prefix server",
//     "install:env": "test -f server/.env || cp server/.env.example server/.env",
//     "postinstall": "npm-run-all --parallel install:*",
//     "lint:client": "npm run lint --prefix client",
//     "lint:server": "npm run lint --prefix server",
//     "lint": "npm-run-all --parallel lint:*",
//     "psql": ". server/.env && psql $DATABASE_URL",
//     "tsc:client": "tsc --project client",
//     "tsc:server": "tsc --project server",
//     "tsc": "npm-run-all --continue-on-error tsc:*",
//     "prepare": "husky install",
//     "deploy": "git push --force origin main:pub"
//   },

//testing
