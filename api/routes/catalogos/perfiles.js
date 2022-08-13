const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/catalogos/perfiles");
const { validateToken } = require('../../middlewares/authenticated');

api.get("/:nPerfil", validateToken, Controller.obtenerPerfiles);
api.post("/", validateToken, Controller.guardarPerfil);

module.exports = api;