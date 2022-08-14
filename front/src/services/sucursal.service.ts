import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private baseUrl: string;
  private urlSucursales = "catalogos/sucursales";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerSucursales(nSucursal: number): any {
    return this.http.get(this.baseUrl + this.urlSucursales + '/' + nSucursal);
  }

  guardarSucursal(item: any): any {

    return this.http.post(this.baseUrl + this.urlSucursales, item);
  }

  eliminarSucursal(nSucursal: number): any {

    return this.http.delete(this.baseUrl + this.urlSucursales + '/' +  nSucursal);
  }
}
