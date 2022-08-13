const service = require("../../services/catalogos/articulos");
const path = require('path');

async function obtenerArticulos(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerArticulos(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function guardarArticulo(req, res) {

    let params = req.body;
    params.cLogin = req.user.cLogin;

    let result = await service.guardarArticulo(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function eliminarArticulo(req, res) {
    
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.eliminarArticulo(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

module.exports = {
    obtenerArticulos,
    guardarArticulo,
    eliminarArticulo
};