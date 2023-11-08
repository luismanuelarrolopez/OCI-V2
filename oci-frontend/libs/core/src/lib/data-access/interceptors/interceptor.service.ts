import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SpinnerService } from '../comun/spinner.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private spinner: SpinnerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.llamarSpinner();
    return next.handle(req).pipe(finalize(() => this.spinner.detenerSpinner()));
  }
}
