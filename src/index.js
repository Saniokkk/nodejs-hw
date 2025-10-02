import path from 'node:path';
console.log('path : ', path.resolve('src'));
// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

// Ініціалізація Express

const app = express();
const PORT = 3000;

// Middleware для парсингу JSON
app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);


app.get('/notes', async (req, res,) => {

  res.json({
    "message": "Retrieved all notes"
  });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`
  });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});


// Middleware 404 (після всіх маршрутів)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Запуск сервера

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
