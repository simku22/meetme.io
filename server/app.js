import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sessions from 'express-session';
import WebAppAuthProvider from 'msal-node-wrapper';
import sql from './db.js'
import cors from 'cors';
import eventRouter from './routes/eventRoutes.js';
import userRouter from './routes/userRoutes.js';
import enableWs from 'express-ws';

dotenv.config();

const authConfig = {
    auth: {
   	    clientId: process.env.CLIENT_ID,
    	authority: process.env.AUTHORITY,
    	clientSecret: process.env.CLIENT_SECRET,
    	redirectUri: "http://localhost:3000/redirect"
    },
	system: {
    	loggerOptions: {
        	loggerCallback(loglevel, message, containsPii) {
            	console.log(message);
        	},
        	piiLoggingEnabled: false,
        	logLevel: 3,
    	}
	}
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

enableWs(app);
app.enable('trust proxy');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.CLIENT_SECRET,
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

const authProvider = await WebAppAuthProvider.WebAppAuthProvider.initialize(authConfig);
app.use(authProvider.authenticate());

app.use((req, res, next) => {
    req.sql = sql;
    next();
});

app.get('/signin', (req, res, next) => {
    return req.authContext.login({
        postLoginRedirectUri: "/", // redirect here after login
    })(req, res, next);
});

app.get('/signout', (req, res, next) => {
    return req.authContext.logout({
        postLogoutRedirectUri: "/", // redirect here after logout
    })(req, res, next);
});

app.ws('/eventSocket', (ws, res) => {
    console.log("someone has connected to the events ws");
}) 

app.use(authProvider.interactionErrorHandler());

app.use('/event', eventRouter)
app.use('/user', userRouter)

export default app;
