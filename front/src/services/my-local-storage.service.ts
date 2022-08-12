import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyLocalStorageService {

  constructor() { }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

}
