const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/registros/compras");
const { validateToken } = require('../../middlewares/authenticated');

api.get("/:nCompra", validateToken, Controller.obtenerCompras);
api.post("/", validateToken, Controller.guardarCompra);
api.delete("/:nCompra", validateToken, Controller.cancelarCompra);
api.get("/consulta/:dFechaInicio/:dFechaFin/:nCompra/:nEmpresa/:nProveedor/:nAlmacen/:nArticulo", validateToken, Controller.obtenerConsultaCompras);
api.post("/confirmar", validateToken, Controller.confirmarCompra);
api.post("/actualizarEstatus", validateToken, Controller.actualizarEstatusCompra);
module.exports = api;