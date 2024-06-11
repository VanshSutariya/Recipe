import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { authSelector } from './store/auth.selector';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select(authSelector).pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
