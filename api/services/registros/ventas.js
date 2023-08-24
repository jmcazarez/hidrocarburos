
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
    const t = await sequelize.transaction();
    try {

        let venta = await sequelize.query(
            `
             CALL proc_guardar_venta (
                ${params.nVenta},
                '${params.cFolioExterno}',
                '${params.dFechaVenta}',
                ${params.nOrigen},
                ${params.nDestino},
                ${params.nVendedor},
                ${params.nChofer},
                '${params.cEquipo}',
                '${params.cPlaca}',
                ${params.nArticulo},
                ${params.nCantidadEnviada},
                ${params.nCantidadRecibida},
                ${params.nCostoLitro},
                ${params.nAnticipo || 0},
                ${params.nFormaPago || null},
                '${params.cEncargado}',
                '${params.cObservaciones}',
                ${params.nTotal}
            )
             `,
            {
                type: QueryTypes.INSERT,
                transaction: t
            }
        );

        let movimiento = await sequelize.query(
            `
             CALL proc_registra_movimiento_de_inventario (
                ${7},
                ${8},
                ${8},
                '${params.dFechaVenta}',
                '${params.cLogin}',
                '${params.nVenta}',
                @rank,
                @contraMovimiento
            )
             `,
            {
                type: QueryTypes.INSERT,
                transaction: t
            }
        ).then((res) => {
            if (res.length === 0) {
                return null;
            }
            return res;
        }).catch(async (error) => {
            await t.rollback();
            throw error;
        });


        if (movimiento[0]) {
            await sequelize.query(
                `
             CALL proc_registra_movimiento_de_inventario_detalle (
                ${movimiento[0].ID},
                ${movimiento[0].nTipoMovimiento},
                ${1},
                ${params.nArticulo},
                ${params.nCantidadEnviada},
                ${params.nCostoLitro},
                ${params.nCostoLitro}
            )
             `,
                {
                    type: QueryTypes.INSERT,
                    transaction: t
                }
            ).then((res) => {
                if (res.length === 0) {
                    return null;
                }
                return res;
            }).catch(async (error) => {
                throw error;
            });

            let aplica = await sequelize.query(
                `
                 CALL proc_aplica_movimiento_almacen (
                    ${movimiento[0].ID}
                )
                 `,
                {
                    type: QueryTypes.INSERT,
                    transaction: t
                }
            ).then((res) => {

                return res;
            }).catch(async (error) => {
                throw error;
            });
        }
        t.commit();
        return {
            status: 200,
            error: '',
            data: venta,
        }

    } catch (err) {
        // do something
        console.log(err);
        t.rollback();
        // do something
        if (err) {
            console.log('entro');
            if(err.parent){
                console.log('entro2');
                return {
                    status: 400,
                    error: err.parent.sqlMessage,
                    data: [],
                };
            }else{
                return {
                    status: 400,
                    error: err,
                    data: [],
                };
            }
            
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