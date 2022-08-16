const express = require('express');
const api = express.Router();
const { validateToken } = require('../../middlewares/authenticated');

var Controller = require("../../controllers/catalogos/cuentas_bancarias");

api.get("/:nCuenta", validateToken, Controller.obtenerCuentasBancarias);
api.post("/", validateToken, validateToken, Controller.guardarCuentaBancaria);
api.delete("/:nCuenta", validateToken, Controller.cancelarCuentaBancaria);

module.exports = api;