
const auth = require('./jwt');
const { QueryTypes } = require("sequelize");
const security = require('../helpers/security');
const sequelize = require('../db/config');

async function validarLogin(params) {

    try {

        // const pwdEncriptado = security.encrypt(params.cPassword);

        let data = await sequelize.query(
            `
             CALL proc_login(  '${params.cLogin}', '${params.cContrasena}')
             `,
            {
                type: QueryTypes.RAW
            }
        );
     
        if (data.length > 0 && data[0]) {                    
            let token = auth.createToken( data[0]);
            const usuario = {
                cNombre: data[0].cNombre,
                cApellidoMaterno: data[0].cApellidoMaterno,
                cApellidoPaterno: data[0].cNombre,
                cCorreo: data[0].cCorreo,
            }
            return {
                status: 200,
                error: '',
                data: {
                    idToken: token,
                    usuario
                }
            };

        } else {
            return {
                status: 400,
                error: 'Usuario/Contraseña incorrectas',
                data: {

                }
            }
        }

    } catch (err) {
        // do something
        return {
            status: 400,
            error: err.original,
            data: {

            }
        };
    }
}

module.exports = {
    validarLogin
};