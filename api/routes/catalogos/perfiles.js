const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/catalogos/perfiles");

api.get("/:nPerfil", [], Controller.obtenerPerfiles);
api.post("/", [], Controller.guardarPerfil);

module.exports = api;