import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  private baseUrl: string;
  private urlAlmacenes = "catalogos/almacenes";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerAlmacenes(nAlmacen: number): any {
    return this.http.get(this.baseUrl + this.urlAlmacenes + '/' + nAlmacen);
  }

  guardarAlmacen(item: any): any {

    return this.http.post(this.baseUrl + this.urlAlmacenes, item);
  }

  eliminarAlmacen(nAlmacen: number): any {

    return this.http.delete(this.baseUrl + this.urlAlmacenes + '/' +  nAlmacen);
  }
}

