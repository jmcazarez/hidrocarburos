import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private baseUrl: string;
  private urlCompras = "registros/compras";
  private urlFlete = "catalogos/generico/catalogos-flete-por-ruta";
  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerCompras(nCompra: number): any {
    return this.http.get(this.baseUrl + this.urlCompras + '/' + nCompra);
  }

  obtenerFlete(nFlete: number): any {
    return this.http.get(this.baseUrl + this.urlFlete + '/' + nFlete);
  }


  guardarCompra(item: any): any {

    return this.http.post(this.baseUrl + this.urlCompras, item);
  }

  eliminarCompra(nCompra: number): any {

    return this.http.delete(this.baseUrl + this.urlCompras + '/' +  nCompra);
  }

  obtenerConsultaCompras(cTipoCompra: string, dFechaInicio: string, dFechaFin: string, nCompra: number, nEmpresa: number, nProveedor: number, nAlmacen: number, nArticulo: number, cFactura: string): any {
    return this.http.post(this.baseUrl + this.urlCompras + '/consulta/', {
      cTipoCompra,
      dFechaInicio,
      dFechaFin,
      nCompra,
      nEmpresa,
      nProveedor,
      nAlmacen,
      nArticulo,
      cFactura
    });
  }
  confirmarCompra(item: any): any {
    return this.http.post(this.baseUrl + this.urlCompras + '/confirmar/', item);
  }

  actualizarEstatusCompra(item: any): any {

    return this.http.post(this.baseUrl + this.urlCompras + '/actualizarEstatus/', item);
  }


}


