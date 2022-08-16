import { BusquedaClienteComponent } from './busqueda-cliente/busqueda-cliente.component';
import { ClienteService } from './../../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from 'src/services/utils.service';
import { formatDate } from '@angular/common';
import { Patterns } from 'src/utils/patterns';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  preserveWhitespaces: true
})
export class ClientsComponent implements OnInit {

  form: FormGroup;

  constructor(
    private service: ClienteService,
    private util: UtilsService,
    public modalService: NgbModal,
    private patterns: Patterns,
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      nCliente : new FormControl({ value: '', disabled: true }, []),
      nTipo : new FormControl('', Validators.required),
      cRazonSocial : new FormControl('', Validators.required),
      cNombre : new FormControl('', Validators.required),
      cApellidoPaterno : new FormControl('', Validators.required),
      cApellidoMaterno : new FormControl('', Validators.required),
      cSexo : new FormControl('', Validators.required),
      dFechaNacimiento : new FormControl('', []),
      cPais : new FormControl('', Validators.required),
      cEstado : new FormControl('', Validators.required),
      cMunicipio : new FormControl('', Validators.required),
      cCURP : new FormControl('', []),
      cRFC : new FormControl('', [Validators.pattern(this.patterns.rfc)]),
      cDireccion : new FormControl('', Validators.required),
      cNumeroExterior : new FormControl('', Validators.required),
      cNumeroInterior : new FormControl('', []),
      cColonia : new FormControl('', Validators.required),
      cCodigoPostal : new FormControl('', [Validators.required, Validators.pattern(this.patterns.zipCode)]),
      cTelefono : new FormControl('', [Validators.pattern(this.patterns.basicPhone)]),
      cCelular : new FormControl('', [Validators.pattern(this.patterns.basicPhone)]),
      cCorreoElectronico : new FormControl('', [Validators.email]),
    });

  }

  get nTipo(): number {
    return this.form.get('nTipo')?.value ?? 0;
  }

  get nCliente(): number {
    if (!this.form.get('nCliente')?.value ||  this.form.get('nCliente')?.value == ''){
      return 0;
    }
    return this.form.get('nCliente')?.value;
  }

  get cRazonSocial(): string {
    return this.form.get('cRazonSocial')?.value ?? '';
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

  get cSexo(): string {
    return this.form.get('cSexo')?.value ?? '';
  }

  get dFechaNacimiento(): string {
    return this.form.get('dFechaNacimiento')?.value ?? '';
  }

  get cPais(): string {
    return this.form.get('cPais')?.value ?? '';
  }

  get cEstado(): string {
    return this.form.get('cEstado')?.value ?? '';
  }

  get cMunicipio(): string {
    return this.form.get('cMunicipio')?.value ?? '';
  }

  get cCURP(): string {
    return this.form.get('cCURP')?.value ?? '';
  }

  get cRFC(): string {
    return this.form.get('cRFC')?.value ?? '';
  }

  get cDireccion(): string {
    return this.form.get('cDireccion')?.value ?? '';
  }

  get cNumeroExterior(): string {
    return this.form.get('cNumeroExterior')?.value ?? '';
  }

  get cNumeroInterior(): string {
    return this.form.get('cNumeroInterior')?.value ?? '';
  }

  get cColonia(): string {
    return this.form.get('cColonia')?.value ?? '';
  }

  get cCodigoPostal(): string {
    return this.form.get('cCodigoPostal')?.value ?? '';
  }

  get cTelefono(): string {
    return this.form.get('cTelefono')?.value ?? '';
  }

  get cCelular(): string {
    return this.form.get('cCelular')?.value ?? '';
  }

  get cCorreoElectronico(): string {
    return this.form.get('cCorreoElectronico')?.value ?? '';
  }


  async guardar(): Promise<void> {

    this.util.dialogConfirm('¿Está seguro que desea guardar los datos?').then((result) => {

      if (result.isConfirmed) {

        // verificar validación del rfc
        if (!this.validarRFC()) {
          return;
        }

        const objCliente = {
          nCliente: this.nCliente,
          nTipo: this.nTipo,
          cRazonSocial : this.cRazonSocial,
          cNombre : this.cNombre,
          cApellidoPaterno : this.cApellidoPaterno,
          cApellidoMaterno : this.cApellidoMaterno,
          cSexo : this.cSexo,
          dFechaNacimiento : new Date().toISOString().split('T')[0],
          cPais : this.cPais,
          cEstado : this.cEstado,
          cMunicipio : this.cMunicipio,
          cCURP : this.cCURP,
          cRFC : this.cRFC,
          cDireccion : this.cDireccion,
          cNumeroExterior : this.cNumeroExterior,
          cNumeroInterior : this.cNumeroInterior,
          cColonia : this.cColonia,
          cCodigoPostal : this.cCodigoPostal,
          cTelefono : this.cTelefono,
          cCelular : this.cCelular,
          cCorreoElectronico : this.cCorreoElectronico
        };

        this.service.guardarCliente(objCliente).subscribe(async (resp: any) => {

          if (resp.error !== '') {

            this.util.dialogError(resp.error.error.type);
          }
          else {
            console.log(resp);
            this.form.controls["nCliente"].setValue(resp.data.id);
            this.util.dialogSuccess('Cliente guardado correctamente.');
          }
        }, (err: { error: any; }) => {

          this.util.dialogError('Error al guardar el cliente.');

        });
      }
    });

  }

  validarRFC(): boolean {
    if (this.cRFC.length > 0 && this.cRFC.length  !== 12 && this.cRFC.length !== 13) {
      this.util.dialogWarning('La longitud del RFC debe ser de 12 o 13 caracteres.');
      return false;
    }

    if (this.cRFC.length > 0) {
      if (this.cRFC.length === 12 && this.nTipo == 1) { // Persona fisica
        this.util.dialogWarning('El registro fiscal seleccionado no corresponde con con el RFC proporcionado.');
        return false;
      } else if (this.cRFC.length === 13 && this.nTipo == 2) {
        this.util.dialogWarning('El registro fiscal seleccionado no corresponde con con el RFC proporcionado.');
        return false;
      }
    }

    return true;
  }

  openModal() {
    const modalRef = this.modalService.open(BusquedaClienteComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value){
          this.form.controls["nCliente"].setValue(value.id);

          this.mostrarDatosCliente();

        }
      }
    );
  }

  mostrarDatosCliente() {
    this.service.obtenerClientes(this.nCliente).subscribe ( (resp: any) => {
      if (resp) {
        const cliente = resp.data[0];
        this.form.controls["nTipo"].setValue(cliente.nTipo);
        this.form.controls["cRazonSocial"].setValue(cliente.cRazonSocial);
        this.form.controls["cNombre"].setValue(cliente.cNombre);
        this.form.controls["cApellidoPaterno"].setValue(cliente.cApellidoPaterno);
        this.form.controls["cApellidoMaterno"].setValue(cliente.cApellidoMaterno);
        this.form.controls["cSexo"].setValue(cliente.cSexo);
        this.form.controls["dFechaNacimiento"].setValue(new Date(cliente.dFechaNacimiento).toISOString().split('T')[0]);
        this.form.controls["cPais"].setValue(cliente.cPais);
        this.form.controls["cEstado"].setValue(cliente.cEstado);
        this.form.controls["cMunicipio"].setValue(cliente.cMunicipio);
        this.form.controls["cCURP"].setValue(cliente.cCURP);
        this.form.controls["cRFC"].setValue(cliente.cRFC);
        this.form.controls["cDireccion"].setValue(cliente.cDireccion);
        this.form.controls["cNumeroExterior"].setValue(cliente.cNumeroExterior);
        this.form.controls["cNumeroInterior"].setValue(cliente.cNumeroInterior);
        this.form.controls["cColonia"].setValue(cliente.cColonia);
        this.form.controls["cCodigoPostal"].setValue(cliente.cCodigoPostal);
        this.form.controls["cTelefono"].setValue(cliente.cTelefono);
        this.form.controls["cCelular"].setValue(cliente.cCelular);
        this.form.controls["cCorreoElectronico"].setValue(cliente.cCorreoElectronico);
      }
    }, (error: any) => {

    });
  }

  limpiar() {
    this.form.controls["nCliente"].setValue('');
    this.form.controls["nTipo"].setValue('');
    this.form.controls["cRazonSocial"].setValue('');
    this.form.controls["cNombre"].setValue('');
    this.form.controls["cApellidoPaterno"].setValue('');
    this.form.controls["cApellidoMaterno"].setValue('');
    this.form.controls["cSexo"].setValue('');
    this.form.controls["dFechaNacimiento"].setValue('');
    this.form.controls["cPais"].setValue('');
    this.form.controls["cEstado"].setValue('');
    this.form.controls["cMunicipio"].setValue('');
    this.form.controls["cCURP"].setValue('');
    this.form.controls["cRFC"].setValue('');
    this.form.controls["cDireccion"].setValue('');
    this.form.controls["cNumeroExterior"].setValue('');
    this.form.controls["cNumeroInterior"].setValue('');
    this.form.controls["cColonia"].setValue('');
    this.form.controls["cCodigoPostal"].setValue('');
    this.form.controls["cTelefono"].setValue('');
    this.form.controls["cCelular"].setValue('');
    this.form.controls["cCorreoElectronico"].setValue('');
  }

  eliminar() {
    this.util.dialogConfirm('¿Está seguro que desea eliminar los datos?').then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarCliente(this.nCliente).subscribe(async (resp: any) => {
          this.util.dialogSuccess('Cliente eliminado correctamente.');
          this.limpiar();
        }, (err: { error: any; }) => {
          // if(err.error.error.type){
          //   this.util.dialogError(err.error.error.type);
          // }else{
          //   this.util.dialogError('Error al guardar la empresa.');
          // }
          this.util.dialogError('Error al eliminar el cliente.');

        });
      }
    });
  }
}
