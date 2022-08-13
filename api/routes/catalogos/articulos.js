const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/catalogos/articulos");
const { validateToken } = require('../../middlewares/authenticated');

api.get("/:nArticulo", validateToken, Controller.obtenerArticulos);
api.post("/", validateToken, Controller.guardarArticulo);
api.delete("/:nArticulo", validateToken, Controller.eliminarArticulo);

module.exports = api;