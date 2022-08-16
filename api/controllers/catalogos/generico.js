const service = require("../../services/catalogos/generico");
const path = require('path');

async function obtenerCatalogosCFDI(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerCatalogosCFDI(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}


module.exports = {
    obtenerCatalogosCFDI
};