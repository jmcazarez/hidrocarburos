const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/catalogos/proveedores");

api.post("/", [], Controller.guardarProveedor);

module.exports = api;