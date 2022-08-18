const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/catalogos/choferes");
const { validateToken } = require('../../middlewares/authenticated');

api.get("/:nChofer", validateToken, Controller.obtenerchoferes);
api.post("/", validateToken, Controller.guardarChofer);
api.delete("/:nChofer", validateToken, Controller.eliminarChofer);

module.exports = api;