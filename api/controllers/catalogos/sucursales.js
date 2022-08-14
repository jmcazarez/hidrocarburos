const service = require("../../services/catalogos/sucursales");
const path = require('path');

async function obtenerSucursales(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerSucursales(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function guardarSucursal(req, res) {

    let params = req.body;
    params.cLogin = req.user.cLogin;

    let result = await service.guardarSucursal(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function eliminarSucursal(req, res) {
    
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.eliminarSucursal(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

module.exports = {
    obtenerSucursales,
    guardarSucursal,
    eliminarSucursal
};