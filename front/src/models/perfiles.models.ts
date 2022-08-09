
export class PerfilesModel {
  nPerfil: number;
  cDescripcion: string = '';
  constructor() {

  }

  castFromResponse(data: any) {
    this.nPerfil = data['nUsuario'] ?? null;
    this.cDescripcion = data['cLogin'] ?? '';
  }
}

