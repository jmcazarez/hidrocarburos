const express = require('express');
const api = express.Router();
const { validateToken } = require('../../middlewares/authenticated');

var Controller = require("../../controllers/catalogos/plazas");

api.get("/:nPlaza", validateToken, Controller.obtenerPlazas);

module.exports = api;