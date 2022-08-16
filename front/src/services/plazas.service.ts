import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlazasService {

  private baseUrl: string;
  private urlPlazas = "catalogos/plazas";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerPlazas(nPlaza: number): any {
    return this.http.get(this.baseUrl + this.urlPlazas + '/' + nPlaza );
  }
}
