import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private baseUrl: string;
  private urlProveedores = "catalogos/proveedores";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerProveedores(nProveedor: number): any {
    return this.http.get(this.baseUrl + this.urlProveedores + '/' + nProveedor);
  }

  guardarProveedor(item: any): any {

    return this.http.post(this.baseUrl + this.urlProveedores, item);
  }
}
