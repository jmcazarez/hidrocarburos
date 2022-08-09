
export class UsuarioModel {
  nUsuario: number;
  cLogin: string = '';
  cContrasena: string = '';
  cNombre: string = '';
  cApellidoPaterno: string = '';
  cApellidoMaterno: string = '';
  cCorreo: string = '';
  constructor() {

  }

  castFromResponse(data: any) {
    this.nUsuario = data['nUsuario'] ?? null;
    this.cLogin = data['cLogin'] ?? '';
    this.cContrasena = data['cContrasena'] ?? '';
    this.cNombre = data['cNombre'] ?? '';
    this.cApellidoPaterno = data['cApellidoPaterno'] ?? '';
    this.cApellidoMaterno = data['cApellidoMaterno'] ?? '';
    this.cCorreo = data['cCorreo'] ?? '';
  }
}

