const service = require("../services/login");

async function validarLogin(req, res) {
    let result = await service.validarLogin(req.body);

    res.status(result.status).json({
        error: result.error,
        data: result.data
    });
}

module.exports = {
    validarLogin
};