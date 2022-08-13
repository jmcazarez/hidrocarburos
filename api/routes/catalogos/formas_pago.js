const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/catalogos/formas_pago");
const { validateToken } = require('../../middlewares/authenticated');

api.get("/", validateToken, Controller.obtenerFormasPago);

module.exports = api;