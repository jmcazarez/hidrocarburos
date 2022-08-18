import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlmacenService } from 'src/services/almacen.service';
import { FleterasService } from 'src/services/fleteras.service';
import { UtilsService } from 'src/services/utils.service';
import { Patterns } from 'src/utils/patterns';
import { BusquedaAlmacenComponent } from '../stores/busqueda-almacen/busqueda-almacen.component';
import { BusquedaFleteraComponent } from './busqueda-fletera/busqueda-fletera.component';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.scss'],
  preserveWhitespaces: true
})
export class ParcelComponent implements OnInit {

  form: FormGroup;

  constructor(
    private service: FleterasService,
    private util: UtilsService,
    public modalService: NgbModal,
    private patterns: Patterns,
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      nFletera : new FormControl({ value: '', disabled: true }, []),
      cDescripcion : new FormControl('', Validators.required),  
      cTelefono : new FormControl('', Validators.pattern(this.patterns.basicPhone)),
      cContacto : new FormControl('', []),
      cCorreoElectronico : new FormControl('', Validators.email),
    });
  }

  get nFletera(): number {
    if (!this.form.get('nFletera')?.value ||  this.form.get('nFletera')?.value == ''){
      return 0;
    }
    return this.form.get('nFletera')?.value;
  }

  get cDescripcion(): string {
    return this.form.get('cDescripcion')?.value ?? '';
  }

  get cTelefono(): string {
    return this.form.get('cTelefono')?.value ?? '';
  }

  get cContacto(): string {
    return this.form.get('cContacto')?.value ?? '';
  }

  get cCorreoElectronico(): string {
    return this.form.get('cCorreoElectronico')?.value ?? '';
  }

  async guardar(): Promise<void> {

    this.util.dialogConfirm('¿Está seguro que desea guardar los datos?').then((result) => {

      if (result.isConfirmed) {

        const obj = {
          nFletera: this.nFletera,
          cDescripcion: this.cDescripcion,
          cTelefono: this.cTelefono,
          cContacto: this.cContacto,
          cCorreoElectronico: this.cCorreoElectronico
        };

        this.service.guardarFletera(obj).subscribe(async (resp: any) => {

          if (resp.error !== '') {

            this.util.dialogError(resp.error.error.type);
          }
          else {
            this.limpiar();
            this.util.dialogSuccess('Fletera guardada correctamente.');
          }
        }, (err: { error: any; }) => {
          // if(err.error.error.type){
          //   this.util.dialogError(err.error.error.type);
          // }else{
          //   this.util.dialogError('Error al guardar la empresa.');
          // }
          this.util.dialogError('Error al guardar la fletera.');

        });
      }
    });

  }


  openModal() {
    const modalRef = this.modalService.open(BusquedaFleteraComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value){
          this.form.controls["nFletera"].setValue(value.id);
          this.mostrarDatos();
          modalRef.close();
        }
      }
    );
  }

  mostrarDatos() {
    this.service.obtenerFleteras(this.nFletera).subscribe ( (resp: any) => {
      if (resp) {
        const fletera = resp.data[0];
        this.form.controls["nFletera"].setValue(fletera.nFletera);
        this.form.controls["cDescripcion"].setValue(fletera.cDescripcion);
        this.form.controls["cTelefono"].setValue(fletera.cTelefono); 
        this.form.controls["cContacto"].setValue(fletera.cContacto); 
        this.form.controls["cCorreoElectronico"].setValue(fletera.cCorreoElectronico); 
      }
    }, (error: any) => {

    });
  }

  limpiar() {
    this.form.controls["nFletera"].setValue('');
    this.form.controls["cDescripcion"].setValue('');
    this.form.controls["cTelefono"].setValue('');
    this.form.controls["cContacto"].setValue('');
    this.form.controls["cCorreoElectronico"].setValue('');
  }

  eliminar() {
    this.util.dialogConfirm('¿Está seguro que desea eliminar los datos?').then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarFletera(this.nFletera).subscribe(async (resp: any) => {
          this.util.dialogSuccess('Fletera eliminada correctamente.');
          this.limpiar();
        }, (err: { error: any; }) => {
          // if(err.error.error.type){
          //   this.util.dialogError(err.error.error.type);
          // }else{
          //   this.util.dialogError('Error al guardar la empresa.');
          // }
          this.util.dialogError('Error al eliminar la fletera.');

        });
      }
    });
  }

}
