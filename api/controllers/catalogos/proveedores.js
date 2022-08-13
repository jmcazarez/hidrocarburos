const service = require("../../services/catalogos/proveedores");
const path = require('path');

async function obtenerProveedores(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerProveedores(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}


async function guardarProveedor(req, res) {
    let params = req.body;
    params.cLogin = req.user.cLogin;
    let result = await service.guardarProveedor(params);
    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function cancelarProveedor(req, res) {

    let params = req.params;
    params.cLogin = req.user.cLogin;
    let result = await service.cancelarProveedor(params);
    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

module.exports = {
    guardarProveedor,
    obtenerProveedores,
    cancelarProveedor
};