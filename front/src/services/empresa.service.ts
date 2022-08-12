import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private baseUrl: string;
  private urlEmpresas = "catalogos/empresas";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerEmpresas(nEmpresa: number): any {
    return this.http.get(this.baseUrl + this.urlEmpresas + '/' + nEmpresa);
  }

  guardarEmpresa(item: any): any {

    return this.http.post(this.baseUrl + this.urlEmpresas, item);
  }

  eliminarEmpresa(nEmpresa: number): any {

    return this.http.delete(this.baseUrl + this.urlEmpresas + '/' +  nEmpresa);
  }
}
