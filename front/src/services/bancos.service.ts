import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BancosService {

  private baseUrl: string;
  private urlBancos = "catalogos/bancos";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerBancos(nBanco: number): any {
    return this.http.get(this.baseUrl + this.urlBancos + '/' + nBanco);
  }


}
