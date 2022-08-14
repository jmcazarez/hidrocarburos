import { BusquedaBusinessComponent } from './busqueda-business/busqueda-business.component';
import { UtilsService } from './../../../../services/utils.service';
import { EmpresaService } from './../../../../services/empresa.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Patterns } from 'src/utils/patterns';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  preserveWhitespaces: true
})
export class BusinessComponent implements OnInit {

  form: FormGroup;

  constructor(
    private service: EmpresaService,
    private util: UtilsService,
    public modalService: NgbModal,
    private patterns: Patterns,
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      nEmpresa : new FormControl({ value: '', disabled: true }, []),
      nTipo : new FormControl('', Validators.required),
      cRazonSocial : new FormControl('', Validators.required),
      cRFC : new FormControl('', [Validators.pattern(this.patterns.rfc)]),
      cCodigoPostal : new FormControl('', [Validators.pattern(this.patterns.zipCode), Validators.required]),
      cPais : new FormControl('', Validators.required),
      cEstado : new FormControl('', Validators.required),
      cMunicipio : new FormControl('', Validators.required),
      cCiudad : new FormControl('', Validators.required),
      cColonia : new FormControl('', Validators.required),
      cDireccion : new FormControl('', Validators.required),
      cNombreRepresentante : new FormControl('', []),
      cApellidoPaternoRepresentante : new FormControl('', []),
      cApellidoMaternoRepresentante : new FormControl('', []),
    });
    // await this.obtenerPerfiles();
  }

  get nTipo(): number {
    return this.form.get('nTipo')?.value ?? 0;
  }

  get nEmpresa(): number {
    if (!this.form.get('nEmpresa')?.value ||  this.form.get('nEmpresa')?.value == ''){
      return 0;
    }
    return this.form.get('nEmpresa')?.value;
  }

  get cRazonSocial(): string {
    return this.form.get('cRazonSocial')?.value ?? '';
  }

  get cRFC(): string {
    return this.form.get('cRFC')?.value ?? '';
  }

  get cCodigoPostal(): string {
    return this.form.get('cCodigoPostal')?.value ?? '';
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

  get cCiudad(): string {
    return this.form.get('cCiudad')?.value ?? '';
  }

  get cColonia(): string {
    return this.form.get('cColonia')?.value ?? '';
  }

  get cDireccion(): string {
    return this.form.get('cDireccion')?.value ?? '';
  }

  get cNombreRepresentante(): string {
    return this.form.get('cNombreRepresentante')?.value ?? '';
  }

  get cApellidoPaternoRepresentante(): string {
    return this.form.get('cApellidoPaternoRepresentante')?.value ?? '';
  }

  get cApellidoMaternoRepresentante(): string {
    return this.form.get('cApellidoMaternoRepresentante')?.value ?? '';
  }

  async guardar(): Promise<void> {

    this.util.dialogConfirm('¿Está seguro que desea guardar los datos?').then((result) => {

      if (result.isConfirmed) {

        // verificar validación del rfc
        if (!this.validarRFC()) {
          return;
        }

        const objEmpresa = {
          nEmpresa: this.nEmpresa,
          nTipo: this.nTipo,
          cRazonSocial : this.cRazonSocial,
          cRFC : this.cRFC,
          cCodigoPostal : this.cCodigoPostal,
          cPais : this.cPais,
          cEstado : this.cEstado,
          cMunicipio : this.cMunicipio,
          cCiudad : this.cCiudad,
          cColonia : this.cColonia,
          cDireccion : this.cDireccion,
          cNombreRepresentante : this.cNombreRepresentante,
          cApellidoPaternoRepresentante : this.cApellidoPaternoRepresentante,
          cApellidoMaternoRepresentante : this.cApellidoMaternoRepresentante,
        };

        this.service.guardarEmpresa(objEmpresa).subscribe(async (resp: any) => {

          if (resp.error !== '') {

            this.util.dialogError(resp.error.error.type);
          }
          else {
            console.log(resp);
            this.form.controls["nEmpresa"].setValue(resp.data.id);
            this.util.dialogSuccess('Empresa guardada correctamente.');
          }
        }, (err: { error: any; }) => {
          // if(err.error.error.type){
          //   this.util.dialogError(err.error.error.type);
          // }else{
          //   this.util.dialogError('Error al guardar la empresa.');
          // }
          this.util.dialogError('Error al guardar la empresa.');

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
    const modalRef = this.modalService.open(BusquedaBusinessComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'dialog-formulario-chico',
    });

    modalRef.closed.subscribe(
      value => {
        console.log('value:', value);
        if(value){
          this.form.controls["nEmpresa"].setValue(value.id);
          this.mostrarDatosEmpresa();
          modalRef.close();
        }
      }
    );
  }

  mostrarDatosEmpresa() {
    this.service.obtenerEmpresas(this.nEmpresa).subscribe ( (resp: any) => {
      if (resp) {
        const empresa = resp.data[0];
        console.log(empresa);
        this.form.controls["nTipo"].setValue(empresa.nTipo);
        this.form.controls["cRazonSocial"].setValue(empresa.cRazonSocial);
        this.form.controls["cRFC"].setValue(empresa.cRFC);
        this.form.controls["cCodigoPostal"].setValue(empresa.cCodigoPostal);
        this.form.controls["cPais"].setValue(empresa.cPais);
        this.form.controls["cEstado"].setValue(empresa.cEstado);
        this.form.controls["cMunicipio"].setValue(empresa.cMunicipio);
        this.form.controls["cCiudad"].setValue(empresa.cCiudad);
        this.form.controls["cColonia"].setValue(empresa.cColonia);
        this.form.controls["cDireccion"].setValue(empresa.cDireccion);
        this.form.controls["cNombreRepresentante"].setValue(empresa.cNombreRepresentante);
        this.form.controls["cApellidoPaternoRepresentante"].setValue(empresa.cApellidoPaternoRepresentante);
        this.form.controls["cApellidoMaternoRepresentante"].setValue(empresa.cApellidoMaternoRepresentante);
      }
    }, (error: any) => {

    });
  }

  limpiar() {
    this.form.controls["nEmpresa"].setValue('');
    this.form.controls["nTipo"].setValue('');
    this.form.controls["cRazonSocial"].setValue('');
    this.form.controls["cRFC"].setValue('');
    this.form.controls["cCodigoPostal"].setValue('');
    this.form.controls["cPais"].setValue('');
    this.form.controls["cEstado"].setValue('');
    this.form.controls["cMunicipio"].setValue('');
    this.form.controls["cCiudad"].setValue('');
    this.form.controls["cColonia"].setValue('');
    this.form.controls["cDireccion"].setValue('');
    this.form.controls["cNombreRepresentante"].setValue('');
    this.form.controls["cApellidoPaternoRepresentante"].setValue('');
    this.form.controls["cApellidoMaternoRepresentante"].setValue('');
  }

  eliminar() {
    this.util.dialogConfirm('¿Está seguro que desea eliminar los datos?').then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarEmpresa(this.nEmpresa).subscribe(async (resp: any) => {
          this.util.dialogSuccess('Empresa eliminada correctamente.');
          this.limpiar();
        }, (err: { error: any; }) => {
          // if(err.error.error.type){
          //   this.util.dialogError(err.error.error.type);
          // }else{
          //   this.util.dialogError('Error al guardar la empresa.');
          // }
          this.util.dialogError('Error al eliminar la empresa.');

        });
      }
    });
  }

}
