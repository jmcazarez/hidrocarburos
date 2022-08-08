
const auth = require('./jwt');
const { QueryTypes } = require("sequelize");
const security = require('../helpers/security');
const sequelize = require('../db/config');

async function validarLogin(params) {

    try {

        // const pwdEncriptado = security.encrypt(params.cPassword);

        // let data = await sequelize.query(
        //     `
        //     EXEC Movil_Login_SP ${ params.nEmpresa }, ${ params.nSucursal }, '${ params.cLogin }', '${ pwdEncriptado }'
        //     `, 
        //     { 
        //         type: QueryTypes.SELECT 
        //     }
        // );

        const usuario = {
            nPersonal: 1,
            cLogin: 'usuario',
            cNombre: 'Juan',
            cApellidoPaterno: 'Perez',
            cApellidoMaterno: 'Lopez',
            cEmail: 'juan.perez@correo.com'
        };

        let token = auth.createToken(usuario);

        return {
            status: 200,
            error: '',
            data: {
                idToken: token,
                usuario
            }
        };


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