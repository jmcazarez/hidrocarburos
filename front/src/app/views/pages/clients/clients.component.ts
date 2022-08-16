import { BusquedaClienteComponent } from './busqueda-cliente/busqueda-cliente.component';
import { ClienteService } from './../../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from 'src/services/utils.service';
import { formatDate } from '@angular/common';
import { Patterns } from 'src/utils/patterns';
import { GenericoService } from 'src/services/generico.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  preserveWhitespaces: true
})
export class ClientsComponent implements OnInit {

  form: FormGroup;
  regimenes = [] as any[];
  usos = [] as any[];

  constructor(
    private service: ClienteService,
    private util: UtilsService,
    public modalService: NgbModal,
    private patterns: Patterns,
    private serviceCFDI: GenericoService
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      nCliente : new FormControl({ value: '', disabled: true }, []),
      nTipo : new FormControl(1, Validators.required),
      cRazonSocial : new FormControl('', []),
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
      cRegimen : new FormControl('', []),
      cUso : new FormControl('', []),
    });
    await this.obtenerCatalogosCFDI();
  }

  obtenerCatalogosCFDI() {
    this.serviceCFDI.obtenerCatalogosCFDI().subscribe( (resp: any) => {
      console.log(resp);
      this.regimenes = resp.data.regimenes;
      this.usos = resp.data.usos;
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

  get cRegimen(): any {
    return this.form.get('cRegimen')?.value;
  }

  get cUso(): any {
    return this.form.get('cUso')?.value;
  }


  async guardar(): Promise<void> {

    this.util.dialogConfirm('¿Está seguro que desea guardar los datos?').then((result) => {

      if (result.isConfirmed) {

        // verificar validación del rfc
        if (!this.validarRFC()) {
          return;
        }

        // verificar validación de regimen fiscal
        if (!this.validarRegimen()) {
          return;
        }

        // verificar validación de uso de cfdi
        if (!this.validarUsoCFDI()) {
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
          cCorreoElectronico : this.cCorreoElectronico,
          cRegimen: this.cRegimen ? this.cRegimen.nRegimenFiscal : null,
          cUso: this.cUso ? this.cUso.nUsoCFDI : null
        };

        this.service.guardarCliente(objCliente).subscribe(async (resp: any) => {

          if (resp.error !== '') {

            this.util.dialogError(resp.error.error.type);
          }
          else {
            console.log(resp);
            this.limpiar();
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

  validarRegimen(): boolean {
    
    if (this.nTipo === 1) {
      console.log('Regimen:', this.cRegimen);
      if (this.cRegimen) {
        if (this.cRegimen.cFiscal[0].toLowerCase() === 'n') {
          this.util.dialogWarning('El regimen fiscal seleccionado no aplica para personas fisicas.');
          return false;
        }
      }      
    }
    else if (this.nTipo === 2) {
      if (this.cRegimen) {
        if (this.cRegimen.cMoral[0].toLowerCase() === 'n') {
          this.util.dialogWarning('El regimen fiscal seleccionado no aplica para personas morales.');
          return false;
        }
      }      
    }

    

    return true;
  }

  validarUsoCFDI(): boolean {
    
    if (this.nTipo === 1) {
      if (this.cUso) {
        if (this.cUso.cFisical[0].toLowerCase() === 'n') {
          this.util.dialogWarning('El uso de cfdi seleccionado no aplica para personas fisicas.');
          return false;
        }
      }      
    }
    else if (this.nTipo === 2) {
      if (this.cUso) {
        if (this.cUso.cMoral[0].toLowerCase() === 'n') {
          this.util.dialogWarning('El uso de cfdi seleccionado no aplica para personas morales.');
          return false;
        }
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

        const regimen = {
          nRegimenFiscal: resp.data[0].reg_nRegimenFiscal,
          cRegimenFiscal: resp.data[0].reg_cRegimenFiscal,
          cDescripcion: resp.data[0].reg_cDescripcion,
          cFiscal: resp.data[0].reg_cFiscal,
          cMoral: resp.data[0].reg_cMoral,
        };
        
        const uso = {
          nUsoCFDI: resp.data[0].uso_nUsoCFDI,
          cUsoCFDI: resp.data[0].uso_cUsoCFDI,
          cDescripcion: resp.data[0].uso_cDescripcion,
          cFisical: resp.data[0].uso_cFisical,
          cMoral: resp.data[0].uso_cMoral
        };

        console.log('Usos:', this.usos);
        console.log('Uso:', uso);

        if (cliente.nTipo === 1) {
          this.cambiarPersonaFisica();
        } else if(cliente.nTipo === 2) {
          this.cambiarPersonaMoral();
        }

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
        this.form.controls["cRegimen"].setValue('');
        this.form.controls["cUso"].setValue('');

        const regimenItem =  this.regimenes.filter(x=>x.nRegimenFiscal === regimen.nRegimenFiscal);
        if (regimenItem.length > 0) {
          this.form.controls["cRegimen"].setValue(regimenItem[0]);
        }        

        const usoItem =  this.usos.filter(x=>x.nUsoCFDI === uso.nUsoCFDI);
        if (usoItem.length > 0) {
          this.form.controls["cUso"].setValue(usoItem[0]);
        }        
        
      }
    }, (error: any) => {

    });
  }

  cambiarPersonaFisica() {
    this.form.controls["cRazonSocial"].setValue('');
    this.form.controls["cRazonSocial"].setValidators(null);
    this.form.controls["cRazonSocial"].updateValueAndValidity();

    this.form.controls["cNombre"].setValue('');
    this.form.controls["cNombre"].setValidators(Validators.required);
    this.form.controls["cNombre"].updateValueAndValidity();

    this.form.controls["cApellidoPaterno"].setValue('');
    this.form.controls["cApellidoPaterno"].setValidators(Validators.required);
    this.form.controls["cApellidoPaterno"].updateValueAndValidity();

    this.form.controls["cApellidoMaterno"].setValue('');
    this.form.controls["cApellidoMaterno"].setValidators(Validators.required);
    this.form.controls["cApellidoMaterno"].updateValueAndValidity();

    this.form.controls["cSexo"].setValue('');
    this.form.controls["cSexo"].setValidators(Validators.required);
    this.form.controls["cSexo"].updateValueAndValidity();

  }

  cambiarPersonaMoral() {
    this.form.controls["cRazonSocial"].setValue('');
    this.form.controls["cRazonSocial"].setValidators([Validators.required]);
    this.form.controls["cRazonSocial"].updateValueAndValidity();

    this.form.controls["cNombre"].setValue('');
    this.form.controls["cNombre"].setValidators(null);
    this.form.controls["cNombre"].updateValueAndValidity();

    this.form.controls["cApellidoPaterno"].setValue('');
    this.form.controls["cApellidoPaterno"].setValidators(null);
    this.form.controls["cApellidoPaterno"].updateValueAndValidity();

    this.form.controls["cApellidoMaterno"].setValue('');
    this.form.controls["cApellidoMaterno"].setValidators(null);
    this.form.controls["cApellidoMaterno"].updateValueAndValidity();

    this.form.controls["cSexo"].setValue('');
    this.form.controls["cSexo"].setValidators(null);
    this.form.controls["cSexo"].updateValueAndValidity();

  }

  limpiar() {
    this.form.controls["nCliente"].setValue('');
    this.form.controls["nTipo"].setValue(1);
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
    this.form.controls["cRegimen"].setValue('');
    this.form.controls["cUso"].setValue('');
    this.cambiarPersonaFisica();
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
