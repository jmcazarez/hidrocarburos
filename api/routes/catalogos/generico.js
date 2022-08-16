const express = require('express');
const api = express.Router();
const { validateToken } = require('../../middlewares/authenticated');

var Controller = require("../../controllers/catalogos/generico");

api.get("/catalogos-cfdi", validateToken, Controller.obtenerCatalogosCFDI);


module.exports = api;