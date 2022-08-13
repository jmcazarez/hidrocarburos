const service = require("../../services/catalogos/concepto_de_gastos");
const path = require('path');

async function obtenerConceptosDeGastos(req, res) {
    let result = await service.obtenerConceptosDeGastos(req.params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function guardarConceptoDeGasto(req, res) {
    let result = await service.guardarConceptoDeGasto(req.body);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

async function cancelarConceptoDeGasto(req, res) {

    let params = req.params;
    params.cLogin = req.user.cLogin;
    let result = await service.cancelarConceptoDeGasto(params);
    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}
module.exports = {
    obtenerConceptosDeGastos,
    guardarConceptoDeGasto,
    cancelarConceptoDeGasto
};