const service = require("../../services/registros/ventas");
const path = require('path');

async function obtenerVentas(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerVentas(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function guardarVenta(req, res) {

    let params = req.body;
    params.cLogin = req.user.cLogin;

    let result = await service.guardarVenta(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

module.exports = {
    obtenerVentas,
    guardarVenta
};