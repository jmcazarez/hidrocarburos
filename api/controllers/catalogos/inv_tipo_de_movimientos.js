const service = require("../../services/catalogos/inv_tipo_de_movimientos");
const path = require('path');

async function obtenerInvTiposDeMovimientos(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerInvTiposDeMovimientos(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

module.exports = {
    obtenerInvTiposDeMovimientos
};