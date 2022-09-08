const express = require('express');
const api = express.Router();
const { validateToken } = require('../../middlewares/authenticated');

var Controller = require("../../controllers/catalogos/inv_tipo_de_movimientos");

api.get("/:nTipoMovimiento", validateToken, Controller.obtenerInvTiposDeMovimientos);


module.exports = api;