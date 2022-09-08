import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProveedorService } from 'src/services/proveedor.service';
import { UtilsService } from 'src/services/utils.service';
import { Patterns } from 'src/utils/patterns';
import Swal from 'sweetalert2';
import { BusquedaProvidersComponent } from './busqueda-providers/busqueda-providers.component';
@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
  preserveWhitespaces: true
})
export class ProvidersComponent implements OnInit {
  form: FormGroup;
  aPersonaFisicaRequired: [];
  constructor(private service: ProveedorService,
    private util: UtilsService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private patterns: Patterns,) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nProveedor: new FormControl({ value: '', disabled: true }, []),
      bPersonaFisica: new FormControl(1, Validators.required),
      bNacional: new FormControl(1, Validators.required),
      cNombreComercial: new FormControl('', Validators.required),
      cRazonSocial: new FormControl('', Validators.required),
      cNombre: new FormControl('', Validators.required),
      cApellidoPaterno: new FormControl('', Validators.required),
      cApellidoMaterno: new FormControl(''),
      cSexo: new FormControl('', Validators.required),
      cPais: new FormControl('', Validators.required),
      cEstado: new FormControl('', Validators.required),
      cMunicipio: new FormControl('', Validators.required),
      cRFC : new FormControl('', [Validators.pattern(this.patterns.rfc)]),
      cDireccion: new FormControl('', Validators.required),
      cNumeroExterior: new FormControl('', Validators.required),
      cNumeroInterior: new FormControl('', []),
      cColonia: new FormControl('', Validators.required),
      cCodigoPostal : new FormControl('', [Validators.required, Validators.pattern(this.patterns.zipCode)]),
      cTelefono : new FormControl('', [Validators.pattern(this.patterns.basicPhone)]),
      cCelular : new FormControl('', [Validators.pattern(this.patterns.basicPhone)]),
      cCorreoElectronico: new FormControl('', [Validators.email]),
    });


  }

  get f() {
    return this.form.controls;
  }

  get nProveedor(): number {
    if (!this.form.get('nProveedor')?.value || this.form.get('nProveedor')?.value == '') {
      return 0;
    }
    return this.form.get('nProveedor')?.value;
  }
  get bPersonaFisica(): number {
    if (this.form.get('bPersonaFisica')?.value)
      this.validacionPersonaFisica()
    else
      this.validacionPersonaMoral()

    return this.form.get('bPersonaFisica')?.value ?? 0;
  }

  get bNacional(): number {
    return this.form.get('bNacional')?.value ?? 1;
  }
  get cRazonSocial(): string {
    return this.form.get('cRazonSocial')?.value ?? '';
  }

  get cNombreComercial(): string {
    return this.form.get('cNombreComercial')?.value ?? '';
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
    const objProveedor = {
        nProveedor: this.nProveedor,
        cRFC: this.cRFC,
        bPersonaFisica: this.bPersonaFisica,
        cRazonSocial: this.cRazonSocial,
        cNombreComercial: this.cNombreComercial,
        cNombre: this.cNombre,
        cApellidoPaterno: this.cApellidoPaterno,
        cApellidoMaterno: this.cApellidoMaterno,
        cTelefono: this.cTelefono,
        cCelular: this.cCelular,
        cCorreoElectronico: this.cCorreoElectronico,
        cEstado: this.cEstado,
        cMunicipio: this.cMunicipio,
        cColonia: this.cColonia,
        cDireccion: this.cDireccion,
        nCodigoPostal: this.cCodigoPostal,
        nDiasCredito: this.cCodigoPostal,
        bActivo: 1,
        cPais: this.cPais,
        cNumeroExterior: this.cNumeroExterior,
        cNumeroInterior: this.cNumeroInterior,
        cSexo: this.cSexo,
        bNacional: this.bNacional
    };

    await this.service.guardarProveedor(objProveedor).subscribe(async (resp: any) => {

      if (resp.error !== '') {

        Swal.fire('Error', resp.error.error, 'error');
      }
      else {
        this.limpiar();
        this.util.dialogSuccess('Proveedor guardado correctamente.');
      }
    }, (err: { error: any; }) => {
      this.util.dialogError('Error al guardar el proveedor.');

    });
  }

  limpiar() {
    this.form.reset();
    this.form.controls["bPersonaFisica"].setValue(1);
  }

  validacionPersonaFisica() {

    this.form.get('cRazonSocial')?.clearValidators();
    this.form.get('cRazonSocial')?.updateValueAndValidity();
    this.form.get('cNombreComercial')?.clearValidators();
    this.form.get('cNombreComercial')?.updateValueAndValidity();
    this.form.get('cNombre')?.setValidators([Validators.required]);
    this.form.get('cApellidoPaterno')?.setValidators([Validators.required]);
    this.form.get('cNombre')?.updateValueAndValidity();
    this.form.get('cApellidoPaterno')?.updateValueAndValidity();
  }
  validacionPersonaMoral() {
    this.form.get('cNombre')?.clearValidators();
    this.form.get('cNombre')?.updateValueAndValidity();
    this.form.get('cSexo')?.clearValidators();
    this.form.get('cSexo')?.updateValueAndValidity();
    this.form.get('cApellidoPaterno')?.clearValidators();
    this.form.get('cApellidoPaterno')?.updateValueAndValidity();
    this.form.get('cRazonSocial')?.setValidators([Validators.required]);
    this.form.get('cNombreComercial')?.setValidators([Validators.required]);
    this.form.get('cRazonSocial')?.updateValueAndValidity();
    this.form.get('cNombreComercial')?.updateValueAndValidity();
  }

  openProveedores() {
    console.log('click');
    const modalRef = this.modalService.open(BusquedaProvidersComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario',
    });

    modalRef.closed.subscribe(
      value => {
        if (value) {
          this.form.controls["nProveedor"].setValue(value.id);
          if (value.id != 0) {
            this.mostrarDatosProveedor()
          }
        }
        // this.enfocarBotonNuevaVenta()

      }
    );
  }

  mostrarDatosProveedor() {
    this.service.obtenerProveedores(this.nProveedor, -1).subscribe((resp: any) => {
      if (resp) {
        const proveedor = resp.data[0];
        console.log(proveedor);
        this.form.controls["bPersonaFisica"].setValue(proveedor.bPersonaFisica);
        this.form.controls["cRFC"].setValue(proveedor.cRFC);
        this.form.controls["cRazonSocial"].setValue(proveedor.cRazonSocial);
        this.form.controls["cNombreComercial"].setValue(proveedor.cNombreComercial);
        this.form.controls["cNombre"].setValue(proveedor.cNombre);
        this.form.controls["cApellidoPaterno"].setValue(proveedor.cApellidoPaterno);
        this.form.controls["cApellidoMaterno"].setValue(proveedor.cApellidoMaterno);
        this.form.controls["cCelular"].setValue(proveedor.cCelular);
        this.form.controls["cTelefono"].setValue(proveedor.cTelefono);
        this.form.controls["cCorreoElectronico"].setValue(proveedor.cContacto);
        this.form.controls["cEstado"].setValue(proveedor.cEstado);
        this.form.controls["cMunicipio"].setValue(proveedor.cMunicipio);
        this.form.controls["cColonia"].setValue(proveedor.cColonia);
        this.form.controls["cDireccion"].setValue(proveedor.cDireccion);
        this.form.controls["cCodigoPostal"].setValue(proveedor.nCodigoPostal);
        this.form.controls["cSexo"].setValue(proveedor.cSexo);
        this.form.controls["cPais"].setValue(proveedor.cPais);
        this.form.controls["cNumeroExterior"].setValue(proveedor.cNumeroExterior);
        this.form.controls["cNumeroInterior"].setValue(proveedor.cNumeroInterior);
        this.form.controls["cCorreoElectronico"].setValue(proveedor.cCorreoElectronico);
        this.form.controls["bNacional"].setValue(proveedor.bNacional);

      }
    }, (error: any) => {

    });
  }

  cancelar() {
    console.log(this.nProveedor);
    this.util.dialogConfirm('¿Está seguro que desea eliminar al proveedor?').then((result) => {
      if (result.isConfirmed) {
        this.service.cancelarProveedor(this.nProveedor).subscribe(async (resp: any) => {
          this.util.dialogSuccess('Proveedor eliminado correctamente.');
          this.limpiar();
        }, (err: { error: any; }) => {
          this.util.dialogError('Error al eliminar el proveedor.');
        });
      }
    });
  }

  validarRFC(): boolean {
    if (this.cRFC.length > 0 && this.cRFC.length !== 12 && this.cRFC.length !== 13) {
      this.util.dialogWarning('La longitud del RFC debe ser de 12 o 13 caracteres.');
      return false;
    }

    if (this.cRFC.length > 0) {
      if (this.cRFC.length === 12 && this.bPersonaFisica == 0) { // Persona fisica
        this.util.dialogWarning('El registro fiscal seleccionado no corresponde con con el RFC proporcionado.');
        return false;
      } else if (this.cRFC.length === 13 && this.bPersonaFisica == 1) {
        this.util.dialogWarning('El registro fiscal seleccionado no corresponde con con el RFC proporcionado.');
        return false;
      }
    }

    return true;
  }
}
