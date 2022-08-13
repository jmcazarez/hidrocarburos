const express = require('express');
const api = express.Router();
const { validateToken } = require('../../middlewares/authenticated');

var Controller = require("../../controllers/catalogos/clientes");

api.get("/:nCliente", validateToken, Controller.obtenerClientes);
api.post("/", validateToken, Controller.guardarCliente);
api.delete("/:nCliente", validateToken, Controller.eliminarCliente);


module.exports = api;