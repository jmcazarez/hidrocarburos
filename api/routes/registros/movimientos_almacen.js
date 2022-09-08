const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/registros/movimientos_almacen");
const { validateToken } = require('../../middlewares/authenticated');

api.get("/:nMovimientoAlmacen", validateToken, Controller.obtenerMovimientoAlmacen);
api.post("/", validateToken, Controller.guardarMovimientoAlmacen);

module.exports = api;