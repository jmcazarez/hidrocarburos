import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ProveedorService } from 'src/services/proveedor.service';
import { UtilsService } from 'src/services/utils.service';
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
  constructor( private service: ProveedorService,
    private util: UtilsService,
    public modalService: NgbModal) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      nProveedor: new FormControl(''),
      bPersonaFisica: new FormControl(''),
      cDescripcion: new FormControl('', Validators.required),
      cNombreComercial: new FormControl('', Validators.required),
      cNombre: new FormControl('', Validators.required),
      cApellidoPaterno: new FormControl('', Validators.required),
      cApellidoMaterno: new FormControl('', Validators.required),
      /*    cCURP: new FormControl('', [Validators.pattern('/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/')]),
         cTelefono: new FormControl('', [RxwebValidators.mask({ mask: '(999)-999 9999' }), Validators.required]),
         cCelular: new FormControl('',[RxwebValidators.mask({ mask: '(999)-999 9999' })]),
         cContacto: new FormControl('', [ Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
         cRFC: new FormControl('',[Validators.pattern('^[A-Za-zñÑ&]{3,4}\d{6}\w{3}$'),Validators.required]), */
      cCURP: new FormControl('', [Validators.required]),
      cTelefono: new FormControl('', [RxwebValidators.mask({ mask: '(999)-999 9999' }), Validators.required]),
      cCelular: new FormControl('', [RxwebValidators.mask({ mask: '(999)-999 9999' })]),
      cContacto: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      cRFC: new FormControl('', [Validators.required]),
      cNacionalidad: new FormControl('', Validators.required),
      cDireccion: new FormControl('', Validators.required),
      cEstado: new FormControl('', Validators.required),
      cMunicipio: new FormControl('', Validators.required),
      cColonia: new FormControl('', Validators.required),
      cCodigoPostal: new FormControl('', Validators.required),
      cDiasEntrega: new FormControl('', Validators.required),
      cFormaPago: new FormControl(0, Validators.required),
      nLimiteCredito: new FormControl(0, Validators.required),
      nDiasCredito: new FormControl(0, Validators.required),
      bActivo: new FormControl(1, Validators.required),
    });


  }

  get f() {
    return this.form.controls;
  }
  get nProveedor(): number {
    return this.form.get('nProveedor')?.value ?? 0;
  }
  get bPersonaFisica(): number {
    return this.form.get('bPersonaFisica')?.value ?? 0;
  }
  get cRFC(): string {
    return this.form.get('cRFC')?.value ?? '';
  }
  get cDescripcion(): string {
    return this.form.get('cDescripcion')?.value ?? '';
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
  get cCURP(): string {
    return this.form.get('cCURP')?.value ?? '';
  }
  get cNacionalidad(): string {
    return this.form.get('cNacionalidad')?.value ?? '';
  }
  get cDireccion(): string {
    return this.form.get('cDireccion')?.value ?? '';
  }
  get cEstado(): string {
    return this.form.get('cEstado')?.value ?? '';
  }
  get cMunicipio(): string {
    return this.form.get('cMunicipio')?.value ?? '';
  }
  get cColonia(): string {
    return this.form.get('cColonia')?.value ?? '';
  }
  get cCodigoPostal(): string {
    return this.form.get('cCodigoPostal')?.value ?? '';
  }
  get cFormaPago(): string {
    return this.form.get('cFormaPago')?.value ?? '';
  }
  get cDiasEntrega(): string {
    return this.form.get('cDiasEntrega')?.value ?? '';
  }
  get nDiasCredito(): number {
    return this.form.get('nDiasCredito')?.value ?? 0;
  }
  get bActivo(): number {
    return this.form.get('bActivo')?.value ?? 0;
  }
  get cTelefono(): string {
    return this.form.get('cTelefono')?.value ?? '';
  }
  get cCelular(): string {
    return this.form.get('cCelular')?.value ?? '';
  }
  get cContacto(): string {
    return this.form.get('cContacto')?.value ?? '';
  }
  get nLimiteCredito(): number {
    return this.form.get('nLimiteCredito')?.value ?? 0;
  }

  async guardar(): Promise<void> {
    const objEmpresa = {
      cRFC: this.cRFC,
      bPersonaFisica: 1,
      cDescripcion: this.cDescripcion,
      cNombreComercial: this.cNombreComercial,
      cNombre: this.cNombre,
      cApellidoPaterno: this.cApellidoPaterno,
      cApellidoMaterno: this.cApellidoMaterno,
      cCURP: this.cCURP,
      cTelefono: this.cTelefono,
      cCelular: this.cCelular,
      cNacionalidad: this.cNacionalidad,
      cContacto: this.cContacto,
      cEstado: this.cEstado,
      cMunicipio: this.cMunicipio,
      cColonia: this.cColonia,
      cDireccion: this.cDireccion,
      nCodigoPostal: this.cCodigoPostal,
      cDiasEntrega: this.cDiasEntrega,
      nFormaPago: this.cFormaPago,
      nLimiteCredito: this.nLimiteCredito,
      nDiasCredito: this.cCodigoPostal,
      bActivo: this.bActivo,
    };

    await this.service.guardarProveedor(objEmpresa).subscribe(async (resp: any) => {

      if (resp.error !== '') {

        Swal.fire('Error', resp.error.error, 'error');
      }
      else {
        this.util.dialogSuccess('Proveedor guardado correctamente.');
      }
    }, (err: { error: any; }) => {
      this.util.dialogError('Error al guardar el proveedor.');

    });
  }

  limpiar(){
    this.form.reset();
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
        console.log('value:', value);
        if(value){
          this.form.controls["nProveedor"].setValue(value.id);
        }
        // this.enfocarBotonNuevaVenta()
      }
    );
  }

}
