const service = require("../../services/catalogos/almacenes");
const path = require('path');

async function obtenerAlmacenes(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerAlmacenes(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function guardarAlmacen(req, res) {

    let params = req.body;
    params.cLogin = req.user.cLogin;

    let result = await service.guardarAlmacen(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function eliminarAlmacen(req, res) {
    
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.eliminarAlmacen(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

module.exports = {
    obtenerAlmacenes,
    guardarAlmacen,
    eliminarAlmacen
};