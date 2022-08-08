const service = require("../../services/catalogos/clientes");
const path = require('path');

async function obtenerClientes(req, res) {
    let result = await service.obtenerClientes(req.params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

module.exports = {
    obtenerClientes
};