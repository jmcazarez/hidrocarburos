const service = require("../../services/catalogos/bancos");
const path = require('path');

async function obtenerBancos(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerBancos(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}



module.exports = {
    obtenerBancos
};