const service = require("../../services/catalogos/empleados");
const path = require('path');

async function obtenerEmpleados(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerEmpleados(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

module.exports = {
    obtenerEmpleados
};