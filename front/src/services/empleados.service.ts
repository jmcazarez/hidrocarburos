import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private baseUrl: string;
  private urlEmpleados = "catalogos/empleados";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  obtenerEmpleados(nEmpleado: number): any {
    return this.http.get(this.baseUrl + this.urlEmpleados + '/' + nEmpleado );
  }
}