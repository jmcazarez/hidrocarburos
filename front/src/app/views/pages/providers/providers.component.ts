import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
  preserveWhitespaces: true
})
export class ProvidersComponent implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      nProveedor: new FormControl('', Validators.required),
      cRFC: new FormControl('',[Validators.pattern('^[A-Za-zñÑ&]{3,4}\d{6}\w{3}$'),Validators.required]),
      bPersonaFisica: new FormControl('', Validators.required),
      cDescripcion: new FormControl('', Validators.required),
      cNombreComercial: new FormControl('', Validators.required),
      cNombre: new FormControl('', Validators.required),
      cApellidoPaterno: new FormControl('', Validators.required),
      cApellidoMaterno: new FormControl('', Validators.required),
      cCURP: new FormControl('', [Validators.pattern('/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/')]),
      cTelefono: new FormControl('', [RxwebValidators.mask({ mask: '(999)-999 9999' }), Validators.required]),
      cCelular: new FormControl('',[RxwebValidators.mask({ mask: '(999)-999 9999' })]),
      cContacto: new FormControl('', [ Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      cNacionalidad: new FormControl('', Validators.required),
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

  openProveedores() {

  }

  guardar() {

  }

}
