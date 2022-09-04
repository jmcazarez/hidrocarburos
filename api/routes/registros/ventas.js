const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/registros/ventas");
const { validateToken } = require('../../middlewares/authenticated');

api.get("/:nVenta", validateToken, Controller.obtenerVentas);
api.post("/", validateToken, Controller.guardarVenta);

module.exports = api;