import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilesService } from 'src/services/perfiles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
  preserveWhitespaces: true
})
export class ProfilesComponent implements OnInit {
  perfiles: any = [];
  form: FormGroup;
  constructor(private _perfilesServices: PerfilesService) { }

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      cDescripcion: new FormControl('', Validators.required)
    });
    await this.obtenerPerfiles();
  }


  async obtenerPerfiles(): Promise<void> {

    await this._perfilesServices.obtenerPerfiles(0).subscribe(async (resp: any) => {

      if (resp.error !== '') {

        Swal.fire('Error', resp.error.error, 'error');
      }
      else {
        this.perfiles = resp.data;
      }
    }, (err: { error: any; }) => {

      Swal.fire('Error', err.error.error, 'error');
    });

  }

  async guardar(): Promise<void> {
    let cDescripcion = this.form.get('cDescripcion')?.value ?? ''
    await this._perfilesServices.guardarPerfil(cDescripcion).subscribe(async (resp: any) => {

      if (resp.error !== '') {

        Swal.fire('Error', resp.error.error, 'error');
      }
      else {
        this.form.controls["cDescripcion"].setValue('');
        this.obtenerPerfiles();
        Swal.fire('Éxito', 'Perfil guardado correctamente.', 'success');
      }
    }, (err: { error: any; }) => {
      if(err.error.error.type){
        Swal.fire('Error', err.error.error.type, 'error');
      }else{
        Swal.fire('Error', 'Error al guardar el perfil', 'error');
      }

    });
  }
}
