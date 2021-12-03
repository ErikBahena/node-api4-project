const express = require("express");
const server = express();

// mocking database access funcitons
const { find, register, login } = require("./users/users-model");

//  middleware
const { validateUser, errorHandling } = require("../middleware/index");
server.use(express.json());

// endpoints

// get all users
server.get("/api/users", (req, res, next) => {
  find()
    .then((users) => res.status(200).json(users))
    .catch((err) => next(err));
});

// register a new user
server.post("/api/register", validateUser, (req, res, next) => {
  register(req.body)
    .then((newUser) => res.status(200).json(newUser))
    .catch((err) => next(err));
});

// login
server.post("/api/login", validateUser, (req, res, next) => {
  login(req.body)
    .then((welcomeMessage) => res.status(200).json(welcomeMessage))
    .catch((err) => {
      err.status = 400;
      next(err);
    });
});

server.use(errorHandling);

module.exports = server;
