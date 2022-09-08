import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private baseUrl: string;
  private urlArticulos = "catalogos/articulos";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerArticulos(nArticulo: number, bNacional: number): any {
    return this.http.get(this.baseUrl + this.urlArticulos + '/' + nArticulo + '/' + bNacional);
  }

  guardarArticulo(item: any): any {

    return this.http.post(this.baseUrl + this.urlArticulos, item);
  }

  cancelarArticulo(nArticulo: number): any {

    return this.http.delete(this.baseUrl + this.urlArticulos + '/' +  nArticulo);
  }
}
