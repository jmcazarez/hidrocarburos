const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/catalogos/clientes");

api.get("/", [], Controller.obtenerClientes);

module.exports = api;