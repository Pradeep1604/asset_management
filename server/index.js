/**
 * External dependencies
 */
const express = require("express");
const compression = require("compression");

/**
 * Internal Dependencies
 */
const config = require("./config.json");
require("dotenv").config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(compression());

/**
 * Authentication Middleware
 */
const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    // return unauthorized error
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");
  if (
    !username ||
    !password ||
    username !== process.env.USER_NAME ||
    password !== process.env.PASSWORD
  ) {
    // return unauthorized error
  }

  return next();
};
server.use(auth);

/**
 * Routes
 */
server.get("/ping", (req, res) => {
  res.send("pong");
});

/**
 * Init Server
 */
function initServer() {
  server.listen(config.port, () => {
    console.log(`***** Server Started at Port: ${config.port} ******`);
  });
}

initServer();
