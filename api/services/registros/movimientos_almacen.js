
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerMovimientoAlmacen(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_obtener_movimientos_almacen(${params.nMovimientoAlmacen})
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
            error: 'Error al obtener el movimiento de almacen.',
            data: [],
        };
    }
}



async function guardarMovimientoAlmacen(params) {

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
                ${ params.dFechaFactura ? "'" + params.dFechaCompra + "'" : null },
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
                ${params.nGalonesCompra},
                ${params.nCostoGalon},
                '${params.dFechaCompra}',
                ${params.nCostoLitro}
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
                error: 'Error al guardar el movimiento de almacen.',
                data: [],
            };
        }

    }
}

module.exports = {
    obtenerMovimientoAlmacen,
    guardarMovimientoAlmacen,
    
};