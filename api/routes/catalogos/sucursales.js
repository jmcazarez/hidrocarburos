const express = require('express');
const api = express.Router();
const { validateToken } = require('../../middlewares/authenticated');

var Controller = require("../../controllers/catalogos/sucursales");

api.get("/:nSucursal", validateToken, Controller.obtenerSucursales);
api.post("/", validateToken, Controller.guardarSucursal);
api.delete("/:nSucursal", validateToken, Controller.eliminarSucursal);


module.exports = api;