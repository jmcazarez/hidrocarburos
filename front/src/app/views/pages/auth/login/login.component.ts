import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioModel } from 'src/models/usuario.models';
import { UsuarioService } from 'src/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  cargando = false
  returnUrl: any;
  loginForm: FormGroup;
  constructor(private _router: Router, private route: ActivatedRoute, private _formBuilder: FormBuilder, private _usuarioService: UsuarioService) {

  }



  ngOnInit(): void {
    this.loginForm = new FormGroup({
      cLogin: new FormControl('', Validators.required),
      cContrasena: new FormControl('', Validators.required)
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f()
  {
      return this.loginForm.controls;
  }
  async onLoggedin(): Promise<void> {

    let usuario = new UsuarioModel()
    usuario.cLogin = this.loginForm.get('cLogin')?.value ?? '';
    usuario.cContrasena = this.loginForm.get('cContrasena')?.value ?? '';
    this.cargando = true;

    await this._usuarioService.validarUsuario({ usuario }).subscribe(async (resp: any) => {

      console.log(resp);
      if (resp.error !== '') {
        this.cargando = false;
        Swal.fire('Error', resp.error.error, 'error');
      }
      else {
        this.cargando = false;
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('token', resp.data.idToken);
        console.log(resp.data);
        localStorage.setItem("usuario", JSON.stringify(resp.data.usuario));

        //localStorage.setItem('usuario',  JSON.parse( resp.data.usuario));
        this._router.navigate([this.returnUrl]);
      }


    }, (err: { error:any; }) => {
      console.log(err.error.error);


      this.cargando = false;
      Swal.fire('Error', err.error.error, 'error');
    });

  }

}
