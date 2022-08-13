import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConceptosDeGastosService {

  private baseUrl: string;
  private ulrConceptosDeGastos = "catalogos/concepto_de_gastos";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerConceptoDeGastos(nConcepto: number): any {
    return this.http.get(this.baseUrl + this.ulrConceptosDeGastos + '/' + nConcepto);
  }

  guardarConceptoDeGastos(concepto: any): any {

    return this.http.post(this.baseUrl + this.ulrConceptosDeGastos, concepto);
  }

  cancelarConceptoDeGastos(nConcepto: number): any {

    return this.http.delete(this.baseUrl + this.ulrConceptosDeGastos + '/' +  nConcepto);
  }
}
