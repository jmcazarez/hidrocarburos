const service = require("../../services/catalogos/plazas");
const path = require('path');

async function obtenerPlazas(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerPlazas(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}


module.exports = {
    obtenerPlazas
};