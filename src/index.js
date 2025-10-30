import express from 'express';
import cors from 'cors';
import "dotenv/config"
import { errors } from 'celebrate';
import cookieParser from "cookie-parser"

import { errorHandler } from './midleware/errorHandler.js';
import { notFoundHendler } from './midleware/notFoundHendler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './midleware/logger.js';
import notesRouter from './routers/notesRoutes.js';
import authRouter from './routers/authRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger);

app.use(authRouter)
app.use(notesRouter)

app.use(notFoundHendler);
app.use(errors())
app.use(errorHandler);

await connectMongoDB()

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('server: ', server.address().port);
});
