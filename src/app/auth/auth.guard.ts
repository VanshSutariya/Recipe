import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { authSelector } from './store/auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(authSelector).pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        } else {
          return this.router.createUrlTree(['/auth']);
        }
      })
      //   tap((isAuth) => {
      //     if (!isAuth) {
      //       return this.router.navigate(['/auth']);
      //     }
      //   })
    );
  }
}
