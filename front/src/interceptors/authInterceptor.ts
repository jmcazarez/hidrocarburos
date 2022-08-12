import { MyLocalStorageService } from './../services/my-local-storage.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private ls: MyLocalStorageService
    ) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.ls.getToken() !== '') {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.ls.getToken()}`
                }
            });
        }
        console.log('token:', this.ls.getToken());
        return next.handle(request);
    }
}
