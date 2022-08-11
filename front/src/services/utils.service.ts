import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgbCalendar, NgbDate, NgbModal } from "@ng-bootstrap/ng-bootstrap";
/* import { NgxSpinnerService } from "ngx-spinner"; */
/* import { LocalStorageService } from "ngx-webstorage";
 */
import { fecha, fechaJulianaAFecha } from "../utils/fecha";
import { CustomDateParserFormatter } from "../utils/formatterNgbDatepicker";
import Swal from "sweetalert2";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    //Modals
    isLoading: boolean = false;
    constructor(
        private modalService: NgbModal,
/*         private localStorage: LocalStorageService, */
/*         private spinner: NgxSpinnerService, */
        private router: Router,
        private formatter: CustomDateParserFormatter,
        private calendar: NgbCalendar,
    ) { }
    showLoading() {
        if (!this.isLoading) {
        /*     this.spinner.show(); */
            this.isLoading = true;
        }
    }

    hideLoading() {
        if (this.isLoading) {
        /*     this.spinner.hide(); */
            this.isLoading = false;
        }
    }

    enfocar(id: string) {
        setTimeout(function () {
            let element = document.getElementById(id);
            element?.focus();
        }, 300);
    }

    dialogWarning(message: string, funcionEjecutar?: any, vm?: any) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'ok-button'
            },
            buttonsStyling: false,
            allowEnterKey: true,
            allowEscapeKey: true

        });
        swalWithBootstrapButtons.fire('', message, 'warning').then((result) => {
            if (funcionEjecutar)
                funcionEjecutar(vm);
        });
    }

    dialogError(message: string, funcionEjecutar?: any, vm?: any) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'error-button'
            },
            buttonsStyling: false,
            allowEnterKey: true

        });
        swalWithBootstrapButtons.fire('', message, 'error').then((result) => {
            if (funcionEjecutar)
                funcionEjecutar(vm);
        });

    }

    dialogSuccess(message: string, funcionEjecutar?: any, vm?: any) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'ok-button'
            },
            allowEnterKey: true,
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire('', message, 'success').then((result) => {
            if (funcionEjecutar)
                funcionEjecutar(vm);
        });
    }

    dialogConfirm(message: string, question?: string) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'ok-button',
                cancelButton: 'error-button'
            },
            buttonsStyling: false,
            allowEnterKey: true
        });
        return swalWithBootstrapButtons.fire({
            title: message,
            text: question ?? '',
            icon: 'question',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        });
    }

    dialogConfirmDelete(message: string, question?: string) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'ok-button-delete',
                cancelButton: 'error-button-delete'
            },
            buttonsStyling: false,
            allowEnterKey: true
        });
        return swalWithBootstrapButtons.fire({
            title: message,
            text: question ?? '',
            icon: 'question',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        });
    }

    dialogSuccessConfirm(message: string, funcionEjecutar?: any, vm?: any) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'ok-button'
            },
            confirmButtonText: 'OK',
            allowEnterKey: true,
            buttonsStyling: false
        });
        return swalWithBootstrapButtons.fire({
            title: '',
            text: message,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }

    dialogWarningConfirm(message: string, funcionEjecutar?: any, vm?: any) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'ok-button'
            },
            confirmButtonText: 'OK',
            allowEnterKey: true,
            buttonsStyling: false
        });
        return swalWithBootstrapButtons.fire({
            title: '',
            text: message,
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    }

    guardarConfiguracionCaja(data: any) {
      /*   this.localStorage.store('dataConfiguracionCaja', JSON.stringify(data)); */
    }

    cajaConfigurada() {
    /*     let existe = this.localStorage.retrieve('dataConfiguracionCaja');
        if (existe && existe != 0) {
            return true;
        }
        else
            return false; */
    }

    obtenerToken() {
       /*  return this.obtenerDataUsuario().cToken; */
    }

    guardarDataUsuario(data: any) {
      /*   this.localStorage.store('dataUsuario', JSON.stringify(data)); */
    }


    obtenerDataUsuario() {
        /* let data = this.localStorage.retrieve('dataUsuario');
        if (data) {
            let dataUsuario: any = JSON.parse(data);
            return dataUsuario;
        } else {
            return new DataUsuarioModel();
        }
         */
    }

    obtenerConfiguracionCaja() {
      /*   let data = this.localStorage.retrieve('dataConfiguracionCaja');
        if (data) {
            let configuracion: any = JSON.parse(data);
            return configuracion;
        } else {
           return new DataConfiguracionCajaModel();
        } */
    }

    usuarioLogueado() {
       /*  let dataUsuario = this.obtenerDataUsuario();
        if (dataUsuario.cToken && dataUsuario.cToken.length > 0)
            return true;
        return false; */
    }

    irDashboard() {
        this.router.navigateByUrl('dashboard');
    }

    fechaJulianaAFecha(nFecha: number) {
        return fechaJulianaAFecha(nFecha);
    }

    obtenerHorasMinutos(nHora: number) {
        let cHora = nHora.toString();
        let cHoraResult = '00';
        let cMinutosResult = '00';
        if (cHora.length == 3) {
            cHoraResult = '0' + cHora.substring(0, 1);
            cMinutosResult = cHora.substring(1, 3);
        }
        if (cHora.length == 4) {
            cHoraResult = cHora.substring(0, 2);
            cMinutosResult = cHora.substring(2, 4);
        }
        return cHoraResult + ':' + cMinutosResult;

    }

    replaceLast(find: any, replace: any, string: any) {
        var lastIndex = string.lastIndexOf(find);

        if (lastIndex === -1) {
            return string;
        }

        var beginString = string.substring(0, lastIndex);
        var endString = string.substring(lastIndex + find.length);

        return beginString + replace + endString;
    }

    isHovered(date: NgbDate, fromDate: NgbDate | null, toDate: NgbDate | null, hoveredDate: NgbDate | null,) {
        return fromDate && !toDate && hoveredDate && date.after(fromDate) && date.before(hoveredDate);
    }

    isInside(date: NgbDate, fromDate: NgbDate | null, toDate: NgbDate | null) {
        return toDate && date.after(fromDate) && date.before(toDate);
    }

    isRange(date: NgbDate, fromDate: NgbDate | null, toDate: NgbDate | null, hoveredDate: NgbDate | null) {
        return date.equals(fromDate) || (toDate && date.equals(toDate)) || this.isInside(date, fromDate, toDate) || this.isHovered(date, fromDate, toDate, hoveredDate);
    }

    validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
        const parsed = this.formatter.parse(input);
        return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    }

    obtenerSemana() {
        let fechaActual = this.calendar.getToday();
        let diaSemanaFechaActual = this.calendar.getWeekday(fechaActual);
        let fechaInicio = this.calendar.getPrev(fechaActual, 'd', diaSemanaFechaActual - 1);
        let fechaFin = this.calendar.getNext(fechaInicio,'d',6);
        return {
            'fechaInicio':fechaInicio,
            'fechaFin':fechaFin
        };
    }
}
