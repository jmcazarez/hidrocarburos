const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/catalogos/empresas");
const { validateToken } = require('../../middlewares/authenticated');

api.get("/:nEmpresa", validateToken, Controller.obtenerEmpresas);
api.post("/", validateToken, Controller.guardarEmpresa);

module.exports = api;