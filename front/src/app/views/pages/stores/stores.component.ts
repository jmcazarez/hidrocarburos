import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlmacenService } from 'src/services/almacen.service';
import { UtilsService } from 'src/services/utils.service';
import { Patterns } from 'src/utils/patterns';
import { BusquedaAlmacenComponent } from './busqueda-almacen/busqueda-almacen.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  preserveWhitespaces: true
})
export class StoresComponent implements OnInit {

  form: FormGroup;

  constructor(
    private service: AlmacenService,
    private util: UtilsService,
    public modalService: NgbModal,
    private patterns: Patterns,
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      nAlmacen : new FormControl({ value: '', disabled: true }, []),
      cDescripcion : new FormControl('', Validators.required),  
      cDomicilio : new FormControl('', Validators.required),
    });
  }

  get nAlmacen(): number {
    if (!this.form.get('nAlmacen')?.value ||  this.form.get('nAlmacen')?.value == ''){
      return 0;
    }
    return this.form.get('nAlmacen')?.value;
  }

  get cDescripcion(): string {
    return this.form.get('cDescripcion')?.value ?? '';
  }

  get cDomicilio(): string {
    return this.form.get('cDomicilio')?.value ?? '';
  }

  async guardar(): Promise<void> {

    this.util.dialogConfirm('¿Está seguro que desea guardar los datos?').then((result) => {

      if (result.isConfirmed) {

        const obj = {
          nAlmacen: this.nAlmacen,
          cDescripcion: this.cDescripcion,
          cDomicilio : this.cDomicilio
        };

        this.service.guardarAlmacen(obj).subscribe(async (resp: any) => {

          if (resp.error !== '') {

            this.util.dialogError(resp.error.error.type);
          }
          else {
            console.log(resp);
            this.form.controls["nAlmacen"].setValue(resp.data.id);
            this.util.dialogSuccess('Almacén guardado correctamente.');
          }
        }, (err: { error: any; }) => {
          // if(err.error.error.type){
          //   this.util.dialogError(err.error.error.type);
          // }else{
          //   this.util.dialogError('Error al guardar la empresa.');
          // }
          this.util.dialogError('Error al guardar el almacén.');

        });
      }
    });

  }


  openModal() {
    const modalRef = this.modalService.open(BusquedaAlmacenComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value){
          this.form.controls["nAlmacen"].setValue(value.id);
          this.mostrarDatos();
          modalRef.close();
        }
      }
    );
  }

  mostrarDatos() {
    this.service.obtenerAlmacenes(this.nAlmacen).subscribe ( (resp: any) => {
      if (resp) {
        const almacen = resp.data[0];
        this.form.controls["nAlmacen"].setValue(almacen.nAlmacen);
        this.form.controls["cDescripcion"].setValue(almacen.cDescripcion);
        this.form.controls["cDomicilio"].setValue(almacen.cDomicilio); 
      }
    }, (error: any) => {

    });
  }

  limpiar() {
    this.form.controls["nAlmacen"].setValue('');
    this.form.controls["cDescripcion"].setValue('');
    this.form.controls["cDomicilio"].setValue('');
  }

  eliminar() {
    this.util.dialogConfirm('¿Está seguro que desea eliminar los datos?').then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarAlmacen(this.nAlmacen).subscribe(async (resp: any) => {
          this.util.dialogSuccess('Almacén eliminado correctamente.');
          this.limpiar();
        }, (err: { error: any; }) => {
          // if(err.error.error.type){
          //   this.util.dialogError(err.error.error.type);
          // }else{
          //   this.util.dialogError('Error al guardar la empresa.');
          // }
          this.util.dialogError('Error al eliminar el almacén.');

        });
      }
    });
  }

}
