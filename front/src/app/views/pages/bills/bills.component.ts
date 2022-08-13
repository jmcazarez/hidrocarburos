import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConceptosDeGastosService } from 'src/services/concepto_de_gastos.service';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
  preserveWhitespaces: true
})
export class BillsComponent implements OnInit {
  conceptos: any = [];
  form: FormGroup;
  constructor( private util: UtilsService, private conceptosService: ConceptosDeGastosService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nConcepto: new FormControl(0),
      cDescripcion: new FormControl('', Validators.required)
    });

    this.obtenerConceptos();
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
      console.log(resp);
      if (resp.error !== '') {

        this.util.dialogError('Error al guardar el conceptos de gasto.');
      }
      else {
        this.form.controls["cDescripcion"].setValue('');
        this.obtenerConceptos();
        this.util.dialogSuccess('Concepto de gasto guardado correctamente.');
      }
    }, (err: { error: any; }) => {
      this.util.dialogError('Error al obtener conceptos de gastos.');

    });
  }

  seleccionar(concepto:any){
    console.log(concepto);
    this.form.controls["nConcepto"].setValue(concepto.nConcepto);
    this.form.controls["cDescripcion"].setValue(concepto.cDescripcion);
  }

  cancelar(){

    this.util.dialogConfirm('¿Está seguro que desea cancelar el concepto de gasto?').then((result) => {
      if (result.isConfirmed) {
        this.conceptosService.cancelarConceptoDeGastos(this.nConcepto).subscribe(async (resp: any) => {
          this.util.dialogSuccess('Concepto cancelado correctamente.');
          this.form.reset();
          this.obtenerConceptos();
        }, (err: { error: any; }) => {
          this.util.dialogError('Error  el concepto de gasto.');
        });
      }
    });
  }
}
