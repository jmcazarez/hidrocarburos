import { Component, OnInit } from '@angular/core';
import { BusquedaBancosComponent } from './busqueda-bancos/busqueda-bancos.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusquedaCuentasComponent } from './busqueda-cuentas/busqueda-cuentas.component';
import { UtilsService } from 'src/services/utils.service';
import { CuentasBancariasService } from 'src/services/cuentas_bancarias.service';
@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.scss'],
  preserveWhitespaces: true
})
export class BankAccountsComponent implements OnInit {

  constructor(private service: CuentasBancariasService, public modalService: NgbModal, private util: UtilsService) { }
  form: FormGroup;

  ngOnInit(): void {

    this.form = new FormGroup({
      nCuenta: new FormControl({ value: '', disabled: true }, [Validators.required]),
      nBanco: new FormControl({ value: '', disabled: true }, [Validators.required]),
      nNumeroCuenta: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
  }

  get nCuenta(): number {
    if (!this.form.get('nCuenta')?.value || this.form.get('nCuenta')?.value == '') {
      return 0;
    }
    return this.form.get('nCuenta')?.value;
  }
  get nBanco(): number {
    return this.form.get('nBanco')?.value ?? '';
  }
  get nNumeroCuenta(): number {
    return this.form.get('nNumeroCuenta')?.value ?? '';
  }
  limpiar() {
    this.form.reset();
  }


  async guardar(): Promise<void> {

    this.util.dialogConfirm('¿Está seguro que desea guardar los datos?').then((result) => {

      if (result.isConfirmed) {


        const objCuentaBancaria = {
          nCuenta: this.nCuenta,
          nBanco: this.nBanco,
          nNumeroCuenta: this.nNumeroCuenta
        };

        this.service.guardarCuenta(objCuentaBancaria).subscribe(async (resp: any) => {

          if (resp.error !== '') {

            this.util.dialogError(resp.error.error.type);
          }
          else {

            this.form.controls["nCuenta"].setValue(resp.data.id);
            this.limpiar();
            this.util.dialogSuccess('Cliente guardado correctamente.');
          }
        }, (err: { error: any; }) => {

          this.util.dialogError('Error al guardar la cuenta bancaria.');

        });
      }
    });

  }
  openModalBancos() {
    const modalRef = this.modalService.open(BusquedaBancosComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-grande',
    });

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if (value) {
          this.form.controls["nBanco"].setValue(value.id);

          /*  this.mostrarDatosCliente(); */

        }
      }
    );
  }

  openModalCuentas() {
    const modalRef = this.modalService.open(BusquedaCuentasComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-grande',
    });

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if (value) {
          this.form.controls["nCuenta"].setValue(value.id);

          /*  this.mostrarDatosCliente(); */
          this.mostrarDatosCuentaBancaria();
        }
      }
    );
  }


  cancelar() {
    this.util.dialogConfirm('¿Está seguro que desea cancelar la cuenta bancaria?').then((result) => {
      if (result.isConfirmed) {
        this.service.cancelarCuentas(this.nCuenta).subscribe(async (resp: any) => {
          this.util.dialogSuccess('Cuenta bancaria cancelado correctamente.');
          this.limpiar();
        }, (err: { error: any; }) => {
          this.util.dialogError('Error al cancelar la cuenta bancaria.');
        });
      }
    });
  }

  mostrarDatosCuentaBancaria() {
    this.service.obtenerCuentas(this.nCuenta).subscribe((resp: any) => {
      if (resp) {
        const cuentaBancaria = resp.data[0];

        this.form.controls["nBanco"].setValue(cuentaBancaria.nBanco);
        this.form.controls["nNumeroCuenta"].setValue(cuentaBancaria.nNumeroCuenta)
      }
    }, (error: any) => {

    });
  }
}
