const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/catalogos/empleados");
const { validateToken } = require('../../middlewares/authenticated');

api.get("/:nEmpleado", validateToken, Controller.obtenerEmpleados);

module.exports = api;