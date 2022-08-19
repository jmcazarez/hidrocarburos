
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerCompras(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_obtener_registro_de_compras(${params.nCompra})
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



async function guardarCompra(params) {

    try {

        let data = await sequelize.query(
            `
             CALL proc_guardar_registro_de_compra (
                ${nCompra},
                '${cTipoCompra}',
                ${nEmpresa},
                ${nAlmacen},
                ${nProveedor},
                '${cFactura}',
                ${dFechaFactura},
                '${cTicket}',
                ${nFletera},
                ${nChofer},
                '${cNumeroTrailer}',
                ${nArticulo},
                '${cFuller1}',
                '${cSellos1}',
                '${cFuller2}',
                '${cSellos2}',
                ${nLitrosCompra},
                ${nTipoCambio},
                ${nCostoTotal},
                ${nCostoCruce},
                ${nCostoFactura},
                ${nCostoFlete},
                ${nUsuario},
                ${nLitrosRecepcion},
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
        if (err) {
            return {
                status: 400,
                error: err,
                data: [],
            };
        } else {
            return {
                status: 400,
                error: 'Error al guardar la sucursal.',
                data: [],
            };
        }

    }
}

async function cancelarCompra(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_eliminar_registro_de_compra (
                ${params.nCompra},
                ${params.nUsuario},
                '${params.cMotivoCancelacion}',
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
        if (err) {
            return {
                status: 400,
                error: err,
                data: [],
            };
        } else {
            return {
                status: 400,
                error: 'Error al eliminar la sucursal.',
                data: [],
            };
        }

    }
}

module.exports = {
    obtenerCompras,
    guardarCompra,
    cancelarCompra
};