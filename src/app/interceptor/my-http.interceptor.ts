import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(localStorage.getItem("_token") !== null){
      const MyToken:any = localStorage.getItem("_token");
      request = request.clone({
        setHeaders:{
          token :MyToken
        }
      })
    }
    return next.handle(request);
  }
}
