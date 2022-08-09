import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/models/usuario.models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usuario: UsuarioModel;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
    let usuarioResp:any = JSON.parse(localStorage.getItem('usuario') ?? '');

    if (usuarioResp) {
      this.usuario.cCorreo = usuarioResp.cCorreo;
      this.usuario.cNombre = usuarioResp.cNombre;
      this.usuario.cApellidoMaterno = usuarioResp.cApellidoMaterno;
      this.usuario.cApellidoPaterno = usuarioResp.cApellidoPaterno;
    }
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

}
