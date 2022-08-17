const service = require("../../services/catalogos/choferes");
const path = require('path');

async function obtenerchoferes(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerchoferes(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function guardarChofer(req, res) {

    let params = req.body;
    params.cLogin = req.user.cLogin;

    let result = await service.guardarChofer(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function eliminarChofer(req, res) {
    
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.eliminarChofer(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

module.exports = {
    obtenerchoferes,
    guardarChofer,
    eliminarChofer
};