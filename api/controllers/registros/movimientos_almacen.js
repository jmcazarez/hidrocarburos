const service = require("../../services/registros/movimientos_almacen");
const path = require('path');

async function obtenerMovimientoAlmacen(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerMovimientoAlmacen(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function guardarMovimientoAlmacen(req, res) {

    let params = req.body;
    params.cLogin = req.user.cLogin;

    let result = await service.guardarMovimientoAlmacen(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function aplicarMovimientoAlmacen(req, res) {

    let params = req.body;
    params.cLogin = req.user.cLogin;

    let result = await service.aplicarMovimientoAlmacen(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}



module.exports = {
    obtenerMovimientoAlmacen,
    guardarMovimientoAlmacen,
    aplicarMovimientoAlmacen
};