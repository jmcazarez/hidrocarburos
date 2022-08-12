const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/catalogos/formas_pago");

api.get("/", [], Controller.obtenerFormasPago);

module.exports = api;