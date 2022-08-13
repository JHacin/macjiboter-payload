import express from 'express';
import payload from 'payload'

const app = express();

payload.init({
  secret: 'SECRET_KEY',
  mongoURL: 'mongodb://127.0.0.1:27017/payload',
  express: app,
})

const port = process.env.port || 3333;

const server = app.listen(port, () => {
  console.log(`Ready on http://localhost:${port}/admin`);
});

server.on('error', console.error);
