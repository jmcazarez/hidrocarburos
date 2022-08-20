
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
            error: 'Error al obtener las compras.',
            data: [],
        };
    }
}



async function guardarCompra(params) {

    try {

        let data = await sequelize.query(
            `
             CALL proc_guardar_registro_de_compra (
                ${params.nCompra},
                '${params.cTipoCompra}',
                ${params.nEmpresa},
                ${params.nAlmacen},
                ${params.nProveedor},
                '${params.cFactura}',
                '${params.dFechaFactura}',
                '${params.cTicket}',
                ${params.nFletera},
                ${params.nChofer},
                '${params.cNumeroTrailer}',
                ${params.nArticulo},
                '${params.cFuller1}',
                '${params.cSellos1}',
                '${params.cFuller2}',
                '${params.cSellos2}',
                ${params.nLitrosCompra},
                ${params.nTipoCambio},
                ${params.nCostoTotal},
                ${params.nCostoCruce},
                ${params.nCostoFactura},
                ${params.nCostoFlete},
                ${1},
                ${params.nLitrosRecepcion}
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
                error: 'Error al guardar la compra.',
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
                error: 'Error al eliminar la compra.',
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