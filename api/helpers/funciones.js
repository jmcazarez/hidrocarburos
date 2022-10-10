const moment = require('moment');

function getDiaSemana(fecha) {
    let diaSemana = fecha.getDay() - 1;
    if (diaSemana < 0) {
        diaSemana = 6;
    }
    return diaSemana;
}

function getSemanaDeMes(fecha) {
    let fechaInicioMes = fecha.getFullYear().toString() + '/' + (fecha.getMonth() + 1).toString().padStart(2, '0') + '/01';
    fechaInicioMes = new Date(fechaInicioMes);

    let diaInicioMes = getDiaSemana(fechaInicioMes);
    let diaRealSemana = fecha.getDate() + diaInicioMes;
    let numeroSemana = Math.trunc(diaRealSemana / 7) + 1;
    return numeroSemana;
}

function getNombreMes(mes) {
    let nombre = '';
    switch (mes) {
        case 1:
            nombre = 'Enero';
            break;
        case 2:
            nombre = 'Febrero';
            break;
        case 3:
            nombre = 'Marzo';
            break;
        case 4:
            nombre = 'Abril';
            break;
        case 5:
            nombre = 'Mayo';
            break;
        case 6:
            nombre = 'Junio';
            break;
        case 7:
            nombre = 'Julio';
            break;
        case 8:
            nombre = 'Agosto';
            break;
        case 9:
            nombre = 'Septiembre';
            break;
        case 10:
            nombre = 'Octubre';
            break;
        case 11:
            nombre = 'Noviembre';
            break;
        case 12:
            nombre = 'Diciembre';
            break;
    }
    return nombre;
}

function formattedDate(d = newDate) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${year}-${month}-${day}`;
}

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
}

function toDate(dateStr) {
    var parts = dateStr.split("/")
    return new Date(parts[2], parts[1] - 1, parts[0])
}

function blobToFile(theBlob, fileName) {
    //A Blob is almost a File - it's just missing the two properties below
    var f = theBlob;
    f.lastModifiedDate = new Date();
    f.name = fileName;
    return f;
}

function dateNumber(date) {
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${year}${month}${day}`;
}



function fechaJuliana(datestring) {
    datestring = datestring.toISOString().slice(0, 10);
    const date = moment(datestring).toDate();
    console.log(date);
    const nDiasPivote = 2415021;
	const mPivote = moment(Date.UTC(1900, 0, 1));
	const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
	return moment(utcDate).diff(mPivote, 'd') + nDiasPivote;
};

function fechaJulianaAFecha(nFecha){
    const nDiasPivote = 2415021;
	const mPivote = moment(new Date(1900, 0, 1));
    mPivote.add(nFecha - nDiasPivote,'days');
    return mPivote.toDate();
}


function formatearFecha(date){
    return  moment(date).format('MM/DD/YYYY');
}

function formatearFechaFormatoEstandar(date){
    return  moment(date).format('DD/MM/YYYY');
}

function missingOneDecimalCheck(nStr) {
    nStr += '';
    const x = nStr.split('.')[1];
    if (x && x.length === 1) return true;   
    return false;
}

function missingAllDecimalsCheck(nStr) {
    nStr += '';
    const x = nStr.split('.')[1];
    if (!x) return true;    
    return false;
}

function numberWithSeparators(nStr) {

    if(nStr === undefined) return '';
    nStr = nStr.toString();
    if (nStr === '') return ''; 
    //console.log(nStr);
    nStr = parseFloat(nStr).toFixed(2);
    let x, x1, x2, rgx, y1, y2;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }

    /** If value was inputed by user, it could have many decimals(up to 7)
        so we need to reformat previous x1 results */
    if (x1.indexOf('.') !== -1) {
        y1 = x1.slice(x1.lastIndexOf('.')).replace(/\,/g, '');

        y2 = x1.split('.');
        x = y2[0] +  y1;
    } else {
        x = x1 + x2;
        if (missingOneDecimalCheck(x)) return x += '0';
        if (missingAllDecimalsCheck(x)) return x += '.00';
    }

    return x;
}

function capitalizeFirstLetter(string) {

    if (string.length > 0)

        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

    else

        return '';

}

module.exports = {
    getSemanaDeMes,
    getNombreMes,
    formattedDate,
    convertDate,
    toDate,
    blobToFile,
    dateNumber,
    fechaJuliana,
    fechaJulianaAFecha,
    formatearFecha
    ,numberWithSeparators,
    capitalizeFirstLetter,
    formatearFechaFormatoEstandar
}