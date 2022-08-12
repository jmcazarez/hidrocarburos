import { UtilsService } from './../../../../services/utils.service';
import { EmpresaService } from './../../../../services/empresa.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
    private util: UtilsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      nTipo : new FormControl('', Validators.required),
      cFolio : new FormControl('', Validators.required),
      cRazonSocial : new FormControl('', Validators.required),
      cRFC : new FormControl('', Validators.required),
      cCodigoPostal : new FormControl('', Validators.required),
      cPais : new FormControl('', Validators.required),
      cEstado : new FormControl('', Validators.required),
      cMunicipio : new FormControl('', Validators.required),
      cCiudad : new FormControl('', Validators.required),
      cColonia : new FormControl('', Validators.required),
      cDireccion : new FormControl('', Validators.required),
      cNombreRepresentante : new FormControl('', Validators.required),
      cApellidoPaternoRepresentante : new FormControl('', Validators.required),
      cApellidoMaternoRepresentante : new FormControl('', Validators.required),
    });
    // await this.obtenerPerfiles();
  }

  get nTipo(): number {
    return this.form.get('nTipo')?.value ?? 0;
  }

  get cFolio(): string {
    return this.form.get('cFolio')?.value ?? '';
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

    const objEmpresa = {
      nEmpresa: 0,
      nTipo: this.nTipo,
      cFolio: this.cFolio,
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

    await this.service.guardarEmpresa(objEmpresa).subscribe(async (resp: any) => {

      if (resp.error !== '') {

        Swal.fire('Error', resp.error.error, 'error');
      }
      else {
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

}
