const service = require("../../services/catalogos/empresas");
const path = require('path');

async function obtenerEmpresas(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerEmpresas(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function guardarEmpresa(req, res) {

    let params = req.body;
    params.cLogin = req.user.cLogin;

    let result = await service.guardarEmpresa(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}
module.exports = {
    obtenerEmpresas,
    guardarEmpresa
};