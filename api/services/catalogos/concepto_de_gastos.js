
const { QueryTypes } = require("sequelize");
const sequelize = require('../../db/config');

async function obtenerConceptosDeGastos(params) {

    try {
        let data = await sequelize.query(
            `
             CALL proc_obtener_conceptos_de_gastos(${params.nConcepto})
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
            error: 'Error al obtener los conceptos de gastos.',
            data: [],
        };
    }
}



async function guardarConceptoDeGasto(params) {
    console.log(params);
    try {
        let data = await sequelize.query(
            `
             CALL proc_guardar_concepto_de_gasto(${params.nConcepto},'${params.cDescripcion}')
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
                error: 'Error al guardar el concepto de gasto.',
                data: [],
            };
        }
      
    }
}

async function cancelarConceptoDeGasto(params) {
    console.log(params);
    try {
        let data = await sequelize.query(
            `
             CALL proc_eliminar_concepto_de_gasto (
                ${params.nConcepto}
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
                error: 'Error al eliminar proveedor.',
                data: [],
            };
        }
      
    }
}


module.exports = {
    obtenerConceptosDeGastos,
    guardarConceptoDeGasto,
    cancelarConceptoDeGasto
};