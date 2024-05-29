import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";
import sessions from "express-session";
import WebAppAuthProvider from "msal-node-wrapper";
import sql from "./db.js";
import cors from "cors";
import eventRouter from "./routes/eventRoutes.js";
import userRouter from "./routes/userRoutes.js";
import enableWs from "express-ws";
import url from "url";

dotenv.config();

const authConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.AUTHORITY,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: "redirect",
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: 3,
    },
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

enableWs(app);
app.enable("trust proxy");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: process.env.CLIENT_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

const authProvider = await WebAppAuthProvider.WebAppAuthProvider.initialize(
  authConfig
);
app.use(authProvider.authenticate());

app.use((req, res, next) => {
  req.sql = sql;
  next();
});

app.get("/signin", (req, res, next) => {
  return req.authContext.login({
    postLoginRedirectUri: "/", // redirect here after login
  })(req, res, next);
});

app.get("/signout", (req, res, next) => {
  return req.authContext.logout({
    postLogoutRedirectUri: "/", // redirect here after logout
  })(req, res, next);
});
////////////////////////////////
let allSockets = {};

app.ws("/eventSocket", (ws, res, req) => {
  // get eventID from websocket
  const parameters = url.parse(res.url, true);
  const eventID = parameters.query.eventID;

  // this is unique to the socket, so only when this socket is making a request will it be able to access this variable
  let mySocketID = eventID;
  console.log("event " + mySocketID + " connected via websocket");

  // add the socket to the dict
  allSockets[mySocketID] = ws;

  ws.on("message", (msg) => {
    console.log(msg);
    const socketMessage = JSON.parse(msg);
    if (socketMessage.event === "join") {
      const socket = allSockets[socketMessage.data.eventID];
      const name = socketMessage.data.name;
      socket.send(`{"event": "join","name": "${name}"}`);
    }
  });

  ws.on("close", () => {
    console.log(`event ${mySocketID} disconnected`);
    delete allSockets[mySocketID];
  });
});

app.post("/socketPostUser", (req, res) => {
  const { name, eventID } = req.body;
  const socket = allSockets[eventID];
  if (socket) {
    socket.send(`{"event": "join","name": "${name}"}`);
  }
});

///////////////////////////////////

app.use(authProvider.interactionErrorHandler());

app.use("/event", eventRouter);
app.use("/user", userRouter);

export default app;
