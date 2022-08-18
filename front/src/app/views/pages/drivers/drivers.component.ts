import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    public modalService: NgbModal,
  ) {
    this.form = new FormGroup({
      nChofer: new FormControl({ value: '', disabled: true }, [Validators.required]),
      cRFC: new FormControl({ value: '', disabled: false, }),
      cNombre: new FormControl({ value: '', disabled: false, }, [Validators.required]),
      cApellidoPaterno: new FormControl({ value: '', disabled: false, }, [Validators.required]),
      cApellidoMaterno: new FormControl({ value: '', disabled: false, }),
      cLicencia: new FormControl({ value: '', disabled: false, }),
      nAntiguedad: new FormControl({ value: '', disabled: false, }),
      nFletera: new FormControl({ value: '', disabled: false, }, [Validators.required]),
    });
  }

  ngOnInit(): void { }



  get nCliente(): number {
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
    return this.form.get('nAntiguedad')?.value ?? 0;
  }
  get nFletera(): number {
    return this.form.get('nFletera')?.value ?? 0;
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

         // this.mostrarDatosCliente();

        }
      }
    );
  }

  onSubmit() {
    console.log('entrar', this.form);
    if (this.form.valid) {

    }
  }
}
