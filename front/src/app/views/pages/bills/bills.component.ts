import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConceptosDeGastosService } from 'src/services/concepto_de_gastos.service';
import { UtilsService } from 'src/services/utils.service';
import { BusquedaConceptosDeGastosComponent } from './busqueda-conceptos-de-gastos/busqueda-conceptos-de-gastos.component';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
  preserveWhitespaces: true
})
export class BillsComponent implements OnInit {
  conceptos: any = [];
  form: FormGroup;
  constructor(private util: UtilsService, public modalService: NgbModal, private conceptosService: ConceptosDeGastosService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nConcepto: new FormControl({ value: '', disabled: true }, [Validators.required]),
      cDescripcion: new FormControl('', Validators.required)
    });
    /* this.obtenerConceptos(); */
  }

  get nConcepto(): number {
    if (!this.form.get('nConcepto')?.value || this.form.get('nConcepto')?.value == '') {
      return 0;
    }
    return this.form.get('nConcepto')?.value;
  }

  get cDescripcion(): string {
    return this.form.get('cDescripcion')?.value ?? '';
  }

  limpiar() {
    this.form.reset();
  }


  async obtenerConceptos(): Promise<void> {

    await this.conceptosService.obtenerConceptoDeGastos(0).subscribe(async (resp: any) => {

      if (resp.error !== '') {

        this.util.dialogError('Error al obtener conceptos de gastos.');
      }
      else {
        this.conceptos = resp.data;
      }
    }, (err: { error: any; }) => {

      this.util.dialogError('Error al obtener conceptos de gastos.');
    });

  }

  async guardar(): Promise<void> {
    let concepto = {
      nConcepto: this.nConcepto,
      cDescripcion: this.cDescripcion
    }
    await this.conceptosService.guardarConceptoDeGastos(concepto).subscribe(async (resp: any) => {
      if (resp.error !== '') {

        this.util.dialogError('Error al guardar el conceptos de gasto.');
      }
      else {
         this.limpiar();
        this.util.dialogSuccess('Concepto de gasto guardado correctamente.');
      }
    }, (err: { error: any; }) => {
      this.util.dialogError('Error al obtener conceptos de gastos.');

    });
  }

  openModal() {
    const modalRef = this.modalService.open(BusquedaConceptosDeGastosComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-pequeño',
    });

    modalRef.closed.subscribe(
      value => {
        if (value) {
          if (value.id) {
            this.form.controls["nConcepto"].setValue(value.id);
            this.mostrarConcepto();
          }          
         
        }
      }
    );
  }

  seleccionar(concepto: any) {
    console.log(concepto);
    this.form.controls["nConcepto"].setValue(concepto.nConcepto);
    this.form.controls["cDescripcion"].setValue(concepto.cDescripcion);
  }

  cancelar() {

    this.util.dialogConfirm('¿Está seguro que desea eliminar el concepto de gasto?').then((result) => {
      if (result.isConfirmed) {
        this.conceptosService.cancelarConceptoDeGastos(this.nConcepto).subscribe(async (resp: any) => {
          this.util.dialogSuccess('Concepto de gasto eliminado correctamente.');
          this.form.reset();
          this.obtenerConceptos();
        }, (err: { error: any; }) => {
          this.util.dialogError('Error el eliminar el concepto de gasto.');
        });
      }
    });
  }


  mostrarConcepto() {
    this.conceptosService.obtenerConceptoDeGastos(this.nConcepto).subscribe((resp: any) => {
      if (resp) {
        const cuentaBancaria = resp.data[0];
        if (cuentaBancaria) {
          this.form.controls["nConcepto"].setValue(cuentaBancaria.nConcepto);
          this.form.controls["cDescripcion"].setValue(cuentaBancaria.cDescripcion);

        }
      }
    }, (error: any) => {

    });
  }
}
