import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl: string;
  private urlClientes = "catalogos/clientes";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerClientes(nCliente: number): any {
    return this.http.get(this.baseUrl + this.urlClientes + '/' + nCliente);
  }

  guardarCliente(item: any): any {

    return this.http.post(this.baseUrl + this.urlClientes, item);
  }

  eliminarCliente(nCliente: number): any {

    return this.http.delete(this.baseUrl + this.urlClientes + '/' +  nCliente);
  }
}

