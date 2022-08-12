const service = require("../../services/catalogos/perfiles");
const path = require('path');


async function guardarProveedor(req, res) {
    let result = await service.guardarProveedor(req.body);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}
module.exports = {
    guardarProveedor
};