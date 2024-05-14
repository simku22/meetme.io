import "dotenv/config.js";
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//import models from './models.js';
import sql from './db.js'
import joinRouter from './routes/join.js';
import testRouter from './routes/test.js';

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


//app.use('*', joinRouter);
app.use('/test', testRouter)
// make sure this stays as the last endpoint
app.get('*', joinRouter)

export default app;
