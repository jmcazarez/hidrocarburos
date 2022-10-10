import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private baseUrl: string;
  private urlVentas = "registros/ventas";
  private urlPdfs = "pdfs/pdfs";
  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerVentas(nVenta: number): any {
    return this.http.get(this.baseUrl + this.urlVentas + '/' + nVenta);
  }
  guardarVenta(item: any): any {
    return this.http.post(this.baseUrl + this.urlVentas, item);
  }

  obtenerTicketVenta(): any{
    return this.http.get(this.baseUrl + this.urlPdfs);
  }


  obtenerConsultaVentas(dFechaInicio: string, dFechaFin: string, nVenta: number, nOrigen: number, nDestino: number, nVendedor: number, nArticulo: number): any {
    return this.http.post(this.baseUrl + this.urlVentas + '/consulta/', {
      dFechaInicio,
      dFechaFin,
      nVenta,
      nOrigen,
      nDestino,
      nVendedor,
      nArticulo
    });
  }

}



