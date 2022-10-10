const service = require("../../services/pdfs/pdfs");
const path = require('path');

async function obtenerTicketVenta(req, res) {
    let params = req.params;
    params.cLogin = req.user.cLogin;

    let result = await service.obtenerTicketVenta(params);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}


module.exports = {
    obtenerTicketVenta
};