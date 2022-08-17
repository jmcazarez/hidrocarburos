const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/catalogos/choferes");
const { validateToken } = require('../../middlewares/authenticated');

api.get("/:nChocer", validateToken, Controller.obtenerchoferes);
api.post("/", validateToken, Controller.guardarChofer);
api.delete("/:nChocer", validateToken, Controller.eliminarChofer);

module.exports = api;