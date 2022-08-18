const service = require("../../services/catalogos/fleteras");
const path = require('path');

async function obtenerFleteras(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerFleteras(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function guardarFletera(req, res) {

    let params = req.body;
    params.cLogin = req.user.cLogin;

    let result = await service.guardarFletera(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function eliminarFletera(req, res) {
    
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.eliminarFletera(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

module.exports = {
    obtenerFleteras,
    guardarFletera,
    eliminarFletera
};