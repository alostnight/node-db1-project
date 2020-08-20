const express = require("express");
const WelcomeRouter = require("../welcome/welcome-router")
const AccountsRouter = require('../accounts/accounts-router');

const server = express();

server.use(express.json());
server.use("/", WelcomeRouter)
server.use("/api/accounts", AccountsRouter);

module.exports = server;
