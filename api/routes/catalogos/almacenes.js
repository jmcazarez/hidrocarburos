const express = require('express');
const api = express.Router();
const { validateToken } = require('../../middlewares/authenticated');

var Controller = require("../../controllers/catalogos/almacenes");

api.get("/:nAlmacen", validateToken, Controller.obtenerAlmacenes);
api.post("/", validateToken, Controller.guardarAlmacen);
api.delete("/:nAlmacen", validateToken, Controller.eliminarAlmacen);


module.exports = api;