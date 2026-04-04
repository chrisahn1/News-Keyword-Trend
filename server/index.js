require('dotenv').config();
const express = require('express');
const argon2 = require('argon2');
const http = require('http');
const cors = require('cors');
const app = express();
const path = require('path');
// const reactStaticDir = path.join(__dirname, '../client/build');
// app.use(express.static(reactStaticDir));
app.use(express.json());

app.use(
  '/api',
  cors({
    origin: ['http://localhost:3001', 'https://news-keyword-trend.vercel.app'],
  })
);
// app.use(express.json());

app.get('/api/news', async (req, res) => {
  const { q, domains, from, to } = req.query;
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}&domains=${domains}&from=${from}&to=${to}&apiKey=${process.env.NEWSAPI_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// const server = http.createServer(app);

const reactStaticDir = path.join(__dirname, '../client/build');
app.use(express.static(reactStaticDir));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

// const reactStaticDir = path.join(__dirname, '../client/dist');
// app.use(express.static(reactStaticDir));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(reactStaticDir, 'index.html'));
// });

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
//     "client": "npm start --prefix client",
//     "server": "npm start --prefix server",
//     "start": "NODE_ENV=production npm run dev",
//     "build": "npm run build --prefix client",
//     "db:import": "sh database/import.sh",
//     "dev:client": "npm run dev --prefix client",
//     "dev:server": "npm run dev --prefix server",
//     "dev": "concurrently \"npm run server\" \"npm run client\"",
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

// "overrides": {
//   "react-refresh": "0.11.0"
// },

//package.json(server):
// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "nodemon index.js",
//     "build": "react-scripts build"
//   },

//package.json(client):
//  "scripts": {
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"
//   },

//package.json(root):
// "scripts": {
//     "client": "npm start --prefix client",
//     "server": "npm start --prefix server",
//     "start": "NODE_ENV=production npm run dev",
//     "build": "npm run build --prefix client",
//     "dev:client": "npm run dev --prefix client",
//     "dev:server": "npm run dev --prefix server",
//     "dev": "concurrently \"npm run server\" \"npm run client\"",
//     "install:client": "npm install --prefix client",
//     "install:server": "npm install --prefix server",
//     "install:env": "test -f server/.env || cp server/.env.example server/.env",
//     "postinstall": "npm-run-all --parallel install:*",
//     "lint:client": "npm run lint --prefix client",
//     "lint:server": "npm run lint --prefix server",
//     "lint": "npm-run-all --parallel lint:*",
//     "tsc:client": "tsc --project client",
//     "tsc:server": "tsc --project server",
//     "tsc": "npm-run-all --continue-on-error tsc:*",
//     "prepare": "husky install",
//     "deploy": "git push --force origin main:pub"
//   },
