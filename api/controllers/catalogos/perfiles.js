const service = require("../../services/catalogos/perfiles");
const path = require('path');

async function obtenerPerfiles(req, res) {
    let result = await service.obtenerPerfiles(req.params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function guardarPerfil(req, res) {
    let result = await service.guardarPerfil(req.body);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}
module.exports = {
    obtenerPerfiles,
    guardarPerfil
};