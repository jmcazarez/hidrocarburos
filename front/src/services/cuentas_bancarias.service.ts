import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentasBancariasService {

  private baseUrl: string;
  private urlCuentas = "catalogos/cuentas_bancarias";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerCuentas(nCuenta: number): any {
    return this.http.get(this.baseUrl + this.urlCuentas + '/' + nCuenta);
  }

  guardarCuenta(item: any): any {

    return this.http.post(this.baseUrl + this.urlCuentas, item);
  }

  cancelarCuentas(nCuenta: number): any {

    return this.http.delete(this.baseUrl + this.urlCuentas + '/' +  nCuenta);
  }
}
