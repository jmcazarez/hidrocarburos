const service = require("../../services/catalogos/clientes");
const path = require('path');

async function obtenerClientes(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerClientes(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function guardarCliente(req, res) {

    let params = req.body;
    params.cLogin = req.user.cLogin;

    let result = await service.guardarCliente(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function eliminarCliente(req, res) {
    
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.eliminarCliente(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

module.exports = {
    obtenerClientes,
    guardarCliente,
    eliminarCliente
};