
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerSucursales(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_sucursales(${params.nSucursal})
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
            error: 'Error al obtener las sucursales.',
            data: [],
        };
    }
}



async function guardarSucursal(params) {

    try {

        let data = await sequelize.query(
            `
             CALL proc_guardar_sucursal (
                ${params.nSucursal},
                '${params.cDescripcion}',
                ${params.nPlaza},
                '${params.cCodigoPostal}',
                '${params.cPais}',
                '${params.cEstado}',
                '${params.cMunicipio}',
                '${params.cCiudad}',
                '${params.cColonia}',
                '${params.cDireccion}',
                '${params.cTelefono}',
                '${params.cCorreoElectronico}',
                '${params.cEncargado}',
                '${params.cCliente}',
                ${params.nAlmacen}
            )
             `,
            {
                type: QueryTypes.INSERT
            }
        );

        return {
            status: 200,
            error: '',
            data: data[0],
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
                error: 'Error al guardar la sucursal.',
                data: [],
            };
        }
      
    }
}

async function eliminarSucursal(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_eliminar_sucursal (
                ${params.nSucursal}
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
                error: 'Error al eliminar la sucursal.',
                data: [],
            };
        }
      
    }
}

module.exports = {
    obtenerSucursales,
    guardarSucursal,
    eliminarSucursal
};