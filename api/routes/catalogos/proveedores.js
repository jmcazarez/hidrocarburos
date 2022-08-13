const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/catalogos/proveedores");
const { validateToken } = require('../../middlewares/authenticated');

api.get("/:nProveedor", validateToken, Controller.obtenerProveedores);
api.post("/", validateToken, Controller.guardarProveedor);
api.delete("/:nProveedor", validateToken, Controller.cancelarProveedor);

module.exports = api;