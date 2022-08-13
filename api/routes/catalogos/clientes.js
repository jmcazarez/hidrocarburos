const express = require('express');
const api = express.Router();
const { validateToken } = require('../../middlewares/authenticated');

var Controller = require("../../controllers/catalogos/clientes");

api.get("/", validateToken, Controller.obtenerClientes);

module.exports = api;