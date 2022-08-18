const express = require('express');
const api = express.Router();
const { validateToken } = require('../../middlewares/authenticated');

var Controller = require("../../controllers/catalogos/fleteras");

api.get("/:nFletera", validateToken, Controller.obtenerFleteras);
api.post("/", validateToken, Controller.guardarFletera);
api.delete("/:nFletera", validateToken, Controller.eliminarFletera);


module.exports = api;