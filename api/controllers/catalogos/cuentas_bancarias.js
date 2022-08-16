const service = require("../../services/catalogos/cuentas_bancarias");
const path = require('path');

async function obtenerCuentasBancarias(req, res) {
    let result = await service.obtenerCuentasBancarias(req.params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function guardarCuentaBancaria(req, res) {
    let result = await service.guardarCuentaBancaria(req.body);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function cancelarCuentaBancaria(req, res) {

    let params = req.params;
    params.cLogin = req.user.cLogin;
    let result = await service.cancelarCuentaBancaria(params);
    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}
module.exports = {
    obtenerCuentasBancarias,
    guardarCuentaBancaria,
    cancelarCuentaBancaria
};