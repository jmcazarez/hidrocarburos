import * as moment from "moment";


export function fechaJuliana(datestring:any) {
    datestring = datestring.toISOString().slice(0, 10);
    const date = moment(datestring).toDate();
    const nDiasPivote = 2415021;
	const mPivote = moment(Date.UTC(1900, 0, 1));
	//const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
	return moment(date).utc(true).diff(mPivote, 'd') + nDiasPivote;
};

export function fechaJulianaAFecha(nFecha:number){
    const nDiasPivote = 2415021;
	const mPivote = moment(new Date(1900, 0, 1));
    mPivote.add(nFecha - nDiasPivote,'days');
    return mPivote.toDate();
}

export function fecha(datestring:any){
    datestring = datestring.toISOString().slice(0, 10);
    const date = moment(datestring).toDate();
    return date;
}

export function obtenerFechaActualJuliano(){
    const nDiasPivote = 2415021;
	const mPivote = moment(Date.UTC(1900, 0, 1));
	return moment(new Date()).utc(true).diff(mPivote, 'd') + nDiasPivote;
}

export function obtenerFechaActual(){
    let dFechaActual =  moment(new Date()).format('YYYY-MM-DD');
    return parseDate(dFechaActual);
}

export function obtenerHorasMinutosEnNumeros(date: Date) {
    let horas = date.getHours();
    let cHoras = '';
    let minutos = date.getMinutes();
    let cMinutos = '';
    if (horas < 10) {
        cHoras = '0' + horas;
    } else {
        cHoras = '' + horas;
    }
    if (minutos < 10) {
        cMinutos = '0' + minutos;
    } else {
        cMinutos = '' + minutos;
    }
    return parseInt(cHoras + cMinutos);
};

export function parseDate(dateString: string) {
    if (dateString) {
        const date = moment(dateString).toDate();

        return date;
    }
    return null;
}
