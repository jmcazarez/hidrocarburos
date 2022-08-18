import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChoferesService } from 'src/services/choferes.service';
import { UtilsService } from 'src/services/utils.service';
import { BusquedaChoferComponent } from './busqueda-chofer/busqueda-chofer.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
  preserveWhitespaces: true
})
export class DriversComponent implements OnInit {
  form: FormGroup;
  constructor(
    private util: UtilsService,
    public modalService: NgbModal, private service: ChoferesService
  ) {
    this.form = new FormGroup({
      nChofer: new FormControl({ value: '', disabled: true }, [Validators.required]),
      cRFC: new FormControl({ value: '', disabled: false, }),
      cNombre: new FormControl({ value: '', disabled: false, }, [Validators.required]),
      cApellidoPaterno: new FormControl({ value: '', disabled: false, }, [Validators.required]),
      cApellidoMaterno: new FormControl({ value: '', disabled: false, }),
      cLicencia: new FormControl({ value: '', disabled: false, }),
      nAntiguedad: new FormControl({ value: '', disabled: false, }),
      nFletera: new FormControl({ value: '', disabled: false, }),
    });
  }

  ngOnInit(): void { }



  get nChofer(): number {
    if (!this.form.get('nChofer')?.value || this.form.get('nChofer')?.value == '') {
      return 0;
    }
    return this.form.get('nChofer')?.value;
  }
  get cRFC(): string {
    return this.form.get('cRFC')?.value ?? '';
  }
  get cNombre(): string {
    return this.form.get('cNombre')?.value ?? '';
  }
  get cApellidoPaterno(): string {
    return this.form.get('cApellidoPaterno')?.value ?? '';
  }
  get cApellidoMaterno(): string {
    return this.form.get('cApellidoMaterno')?.value ?? '';
  }
  get cLicencia(): string {
    return this.form.get('cLicencia')?.value ?? '';
  }
  get nAntiguedad(): number {
    if (!this.form.get('nAntiguedad')?.value || this.form.get('nAntiguedad')?.value == '') {
      return 0;
    }
    return this.form.get('nAntiguedad')?.value;
  }
  get nFletera(): number {
    if (!this.form.get('nFletera')?.value || this.form.get('nFletera')?.value == '') {
      return 0;
    }
    return this.form.get('nFletera')?.value;
  }

  openModal() {
    const modalRef = this.modalService.open(BusquedaChoferComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-mediano',
    });

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value){
          this.form.controls["nChofer"].setValue(value.id);

          this.mostrarDatosChofer();

        }
      }
    );
  }

  mostrarDatosChofer(){
    this.service.obtenerChoferes(this.nChofer).subscribe ( (resp: any) => {
      if (resp) {
        const chofer = resp.data[0];
        this.form.controls["cRFC"].setValue(chofer.cRFC);
        this.form.controls["cNombre"].setValue(chofer.cNombre);
        this.form.controls["cApellidoPaterno"].setValue(chofer.cApellidoPaterno);
        this.form.controls["cApellidoMaterno"].setValue(chofer.cApellidoMaterno);
        this.form.controls["cLicencia"].setValue(chofer.cLicencia);
        this.form.controls["nAntiguedad"].setValue(chofer.nAntiguedad);
        this.form.controls["nFletera"].setValue(chofer.nFletera);
      }
    }, (error: any) => {

    });
  }

  async guardar(): Promise<void> {

    this.util.dialogConfirm('¿Está seguro que desea guardar el chofer?').then((result) => {

      if (result.isConfirmed) {



        const objChofer = {
          nChofer: this.nChofer,
          cNombre : this.cNombre,
          cApellidoPaterno : this.cApellidoPaterno,
          cApellidoMaterno : this.cApellidoMaterno,
          cRFC: this.cRFC,
          cLicencia:this.cLicencia,
          nAntiguedad: this.nAntiguedad,
          nFletera: this.nFletera
        };

        this.service.guardarChofer(objChofer).subscribe(async (resp: any) => {

          if (resp.error !== '') {

            this.util.dialogError(resp.error.error.type);
          }
          else {
            console.log(resp);
            this.limpiar();
            this.util.dialogSuccess('Chofer guardado correctamente.');
          }
        }, (err: { error: any; }) => {

          this.util.dialogError('Error al guardar el chofer.');

        });
      }
    });

  }

  eliminar() {
    this.util.dialogConfirm('¿Está seguro que desea eliminar al chofer?').then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarChofer(this.nChofer).subscribe(async (resp: any) => {
          this.util.dialogSuccess('Chofer eliminado correctamente.');
          this.limpiar();
        }, (err: { error: any; }) => {
          this.util.dialogError('Error al eliminar el chofer.');

        });
      }
    });
  }

  limpiar(){
    this.form.reset();
  }
}
