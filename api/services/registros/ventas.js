
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerVentas(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_obtener_ventas(${params.nVenta})
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
            error: 'Error al obtener las ventas.',
            data: [],
        };
    }
}

async function guardarVenta(params) {

    try {

        let data = await sequelize.query(
            `
             CALL proc_guardar_venta (
                ${ params.nVenta },
                '${ params.cFolioExterno }',
                '${ params.dFechaVenta }',
                ${ params.nOrigen },
                ${ params.nDestino },
                ${ params.nVendedor },
                ${ params.nChofer },
                '${ params.cEquipo }',
                '${ params.cPlaca }',
                ${ params.nArticulo },
                ${ params.nCantidadEnviada },
                ${ params.nCantidadRecibida },
                ${ params.nCostoLitro },
                ${ params.nAnticipo },
                ${ params.nFormaPago },
                '${ params.cEncargado }',
                '${ params.cObservaciones }',
                ${ params.nTotal }
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
                error: 'Error al guardar la venta.',
                data: [],
            };
        }

    }
}

async function obtenerConsultaVentas(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_consulta_ventas(
                 '${params.dFechaInicio}',
                 '${params.dFechaFin}',
                 ${params.nVenta},
                 ${params.nOrigen},
                 ${params.nDestino},
                 ${params.nVendedor},
                 ${params.nArticulo}
            )
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
            error: 'Error al obtener las ventas.',
            data: [],
        };
    }
}


module.exports = {
    obtenerVentas,
    guardarVenta,
    obtenerConsultaVentas
};