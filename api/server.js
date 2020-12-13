const express = require("express");
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());
const actionsAPI = require("./actions/actions-router");
const projectsAPI = require("./projects/projects-router");

server.use("/api/actions", actionsAPI);
server.use("/api/projects", projectsAPI);

module.exports = server;
