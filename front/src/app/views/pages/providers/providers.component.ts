import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { disable, RxwebValidators } from '@rxweb/reactive-form-validators';
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
  constructor(private service: ProveedorService,
    private util: UtilsService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nProveedor: [{ value: '', disabled: true }],
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
      cTelefono: new FormControl('', [Validators.required]),
      cCelular: new FormControl('', [Validators.required]),
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
      cImpuestos: new FormControl('', Validators.required),
      nPagoFlete: new FormControl(0, Validators.required),
      bActivo: new FormControl(1),
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
    const objProveedor = {
      nProveedor: this.nProveedor,
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

    await this.service.guardarProveedor(objProveedor).subscribe(async (resp: any) => {

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

  limpiar() {
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
        if (value) {
          this.form.controls["nProveedor"].setValue(value.id);
          if (value.id != 0) {
            this.mostrarDatosEmpresa()
          }
        }
        // this.enfocarBotonNuevaVenta()

      }
    );
  }

  mostrarDatosEmpresa() {
    this.service.obtenerProveedores(this.nProveedor).subscribe((resp: any) => {
      if (resp) {
        const proveedor = resp.data[0];
        console.log(proveedor);

        this.form.controls["cRFC"].setValue(proveedor.cRFC);
        this.form.controls["cDescripcion"].setValue(proveedor.cDescripcion);
        this.form.controls["cNombreComercial"].setValue(proveedor.cNombreComercial);
        this.form.controls["cNombre"].setValue(proveedor.cNombre);
        this.form.controls["cApellidoPaterno"].setValue(proveedor.cApellidoPaterno);
        this.form.controls["cApellidoMaterno"].setValue(proveedor.cApellidoMaterno);
        this.form.controls["cCelular"].setValue(proveedor.cCelular);
        this.form.controls["cCURP"].setValue(proveedor.cCURP);
        this.form.controls["cTelefono"].setValue(proveedor.cTelefono);
        this.form.controls["cNacionalidad"].setValue(proveedor.cNacionalidad);
        this.form.controls["cContacto"].setValue(proveedor.cContacto);
        this.form.controls["cEstado"].setValue(proveedor.cEstado);
        this.form.controls["cMunicipio"].setValue(proveedor.cMunicipio);
        this.form.controls["cColonia"].setValue(proveedor.cColonia);
        this.form.controls["cDireccion"].setValue(proveedor.cDireccion);
        this.form.controls["cCodigoPostal"].setValue(proveedor.nCodigoPostal);
        this.form.controls["cDiasEntrega"].setValue(String(proveedor.cDiasEntrega));
        this.form.controls["cFormaPago"].setValue(proveedor.nFormaPago);
        this.form.controls["nLimiteCredito"].setValue(proveedor.nLimiteCredito);
        this.form.controls["nDiasCredito"].setValue(proveedor.nDiasCredito);

        console.log(proveedor.cDiasEntrega);
      }
    }, (error: any) => {

    });
  }

  cancelar(){
    console.log(this.nProveedor);
    this.util.dialogConfirm('¿Está seguro que desea cancelar al proveedor?').then((result) => {
      if (result.isConfirmed) {
        this.service.cancelarProveedor(this.nProveedor).subscribe(async (resp: any) => {
          this.util.dialogSuccess('Proveedor cancelado correctamente.');
          this.limpiar();
        }, (err: { error: any; }) => {
          this.util.dialogError('Error al cancelar el proveedor.');
        });
      }
    });
  }

}
