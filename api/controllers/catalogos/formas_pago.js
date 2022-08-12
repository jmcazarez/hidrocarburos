const service = require("../../services/catalogos/formas_pago");
const path = require('path');

async function obtenerFormasPago(req, res) {
    let result = await service.obtenerFormasPago(req.params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

module.exports = {
    obtenerFormasPago
};