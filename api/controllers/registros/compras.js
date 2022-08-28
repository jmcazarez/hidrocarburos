const service = require("../../services/registros/compras");
const path = require('path');

async function obtenerCompras(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerCompras(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function guardarCompra(req, res) {

    let params = req.body;
    params.cLogin = req.user.cLogin;

    let result = await service.guardarCompra(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function cancelarCompra(req, res) {
    
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.cancelarCompra(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function obtenerConsultaCompras(req, res) {
    let params = req.body;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerConsultaCompras(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}


async function confirmarCompra(req, res) {
    let params = req.body;
    params.cLogin = req.user.cLogin;

    let result = await service.confirmarCompra(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function actualizarEstatusCompra(req, res) {
    let params = req.body;
    params.cLogin = req.user.cLogin;

    let result = await service.actualizarEstatusCompra(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

module.exports = {
    obtenerCompras,
    guardarCompra,
    cancelarCompra,
    obtenerConsultaCompras,
    confirmarCompra,
    actualizarEstatusCompra
};