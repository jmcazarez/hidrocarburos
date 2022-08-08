const express = require('express');
const api = express.Router();

var Controller = require("../controllers/login");

api.post("/", [], Controller.validarLogin);

module.exports = api;