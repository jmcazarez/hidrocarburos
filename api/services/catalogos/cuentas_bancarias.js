
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerCuentasBancarias(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_obtener_cuentas_bancarias(${params.nCuenta})
             `,
            {
                type: QueryTypes.RAW
            }
        );

        return {
            status: 200,
            error: '',
            data: data,
        }

    } catch (err) {
        // do something
        console.log(err);
        return {
            status: 400,
            error: 'Error al obtener las cuentas bancarias.',
            data: [],
        };
    }
}



async function guardarCuentaBancaria(params) {
    console.log(params);
    try {
        let data = await sequelize.query(
            `
             CALL proc_guardar_cuenta_bancaria(${params.nCuenta},'${params.nBanco}','${params.nNumeroCuenta}')
             `,
            {
                type: QueryTypes.INSERT
            }
        );
        console.log(data[0]);

        return {
            status: 200,
            error: '',
            data: data[0],
        }

    } catch (err) {
        // do something
     
        console.log(err);
        if(err.errors[0]){
            return {
                status: 400,
                error: err.errors[0],
                data: [],
            };
        }else{
            return {
                status: 400,
                error: 'Error al guardar la cuenta bancaria.',
                data: [],
            };
        }
      
    }
}

async function cancelarCuentaBancaria(params) {
    console.log(params);
    try {
        let data = await sequelize.query(
            `
             CALL proc_eliminar_cuenta_bancaria (
                ${params.nCuenta}
            )
             `,
            {
                type: QueryTypes.INSERT
            }
        );

        return {
            status: 200,
            error: '',
            data: []
        }

    } catch (err) {
        // do something
     
        console.log(err);
        if(err){
            return {
                status: 400,
                error: err,
                data: [],
            };
        }else{
            return {
                status: 400,
                error: 'Error al eliminar la cuenta bancaria.',
                data: [],
            };
        }
      
    }
}


module.exports = {
    obtenerCuentasBancarias,
    guardarCuentaBancaria,
    cancelarCuentaBancaria
};