const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/catalogos/proveedores");

api.get("/:nProveedor", validateToken, Controller.obtenerProveedores);
api.post("/", [], Controller.guardarProveedor);

module.exports = api;