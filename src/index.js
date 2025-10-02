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

// Логування часу
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

// Маршрут
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello, World!' });
// });

app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId } = req.params;
  res.status(200).json({ message: `Hello, World! ${userId}` });
});

app.get('/', async (req, res) => {
  // відхилений проміс / throw всередині async -> Express 5 передасть помилку в error middleware
  const user = await Promise.reject('Something went wrong');
  res.json(user);
});

app.get('/timeout', (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error('Цю помилку треба ловити вручну');
    } catch (err) {
      next(err);
    }
  }, 100);
  //   res.send('ok');
});

// app.get('/timeout', (req, res, next) => {
//   setTimeout(() => {
//     throw new Error('Цю помилку треба ловити вручну');
//   }, 100);
//   res.send('ok');
// });

// Middleware 404 (після всіх маршрутів)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Запуск сервера

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
