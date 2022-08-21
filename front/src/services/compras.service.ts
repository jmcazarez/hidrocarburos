import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private baseUrl: string;
  private urlCompras = "registros/compras";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerCompras(nCompra: number): any {
    console.log('nCompra:', nCompra);
    return this.http.get(this.baseUrl + this.urlCompras + '/' + nCompra);
  }

  guardarCompra(item: any): any {

    return this.http.post(this.baseUrl + this.urlCompras, item);
  }

  eliminarCompra(nCompra: number): any {

    return this.http.delete(this.baseUrl + this.urlCompras + '/' +  nCompra);
  }
}


