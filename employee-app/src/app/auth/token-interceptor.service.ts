// src/app/auth/token-interceptor.service.ts
import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  const tokenService = inject(TokenStorageService); // inject service dans une fonction
  const token = tokenService.getToken();

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    return next(cloned);
  }
  return next(req);
};
