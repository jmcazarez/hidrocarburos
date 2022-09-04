import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormasPagoService {

  private baseUrl: string;
  private urlFormasPago = "catalogos/formas_pago";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerFormasPago(): any {
    return this.http.get(this.baseUrl + this.urlFormasPago);
  }

}

