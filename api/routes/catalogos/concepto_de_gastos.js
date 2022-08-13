const express = require('express');
const api = express.Router();
const { validateToken } = require('../../middlewares/authenticated');

var Controller = require("../../controllers/catalogos/concepto_de_gastos");

api.get("/:nConcepto", validateToken, Controller.obtenerConceptosDeGastos);
api.post("/", validateToken, validateToken, Controller.guardarConceptoDeGasto);
api.delete("/:nConcepto", validateToken, Controller.cancelarConceptoDeGasto);

module.exports = api;