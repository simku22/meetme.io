import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

import sql from './db.js'
import eventRouter from './routes/eventRoutes.js';
import userRouter from './routes/userRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    req.sql = sql;
    next();
});

app.use('/events', eventRouter)
app.use('/users', userRouter)

export default app;
