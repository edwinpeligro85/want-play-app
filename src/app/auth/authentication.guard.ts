import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';

import { Logger } from '@shared';
import { AuthState } from './state';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private _store: Store) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this._store.selectSnapshot(AuthState.isAuthenticated);

    if (isAuthenticated) {
      return isAuthenticated;
    }

    log.debug('Not authenticated, redirecting and adding redirect url...');
    this.router.navigate(['/auth/sign-in'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return isAuthenticated;
  }
}
