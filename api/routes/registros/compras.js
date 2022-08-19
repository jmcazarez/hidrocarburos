const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/registros/compras");
const { validateToken } = require('../../middlewares/authenticated');

api.get("/:nCompra", validateToken, Controller.obtenerCompras);
api.post("/", validateToken, Controller.guardarCompra);
api.delete("/:nCompra", validateToken, Controller.cancelarCompra);

module.exports = api;