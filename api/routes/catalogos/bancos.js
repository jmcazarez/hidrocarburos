const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/catalogos/bancos");
const { validateToken } = require('../../middlewares/authenticated');

api.get("/:nBanco", validateToken, Controller.obtenerBancos);

module.exports = api;