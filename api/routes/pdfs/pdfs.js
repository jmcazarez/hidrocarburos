const express = require('express');
const api = express.Router();

var Controller = require("../../controllers/pdfs/pdfs");
const { validateToken } = require('../../middlewares/authenticated');

api.get("/", validateToken, Controller.obtenerTicketVenta);
module.exports = api;