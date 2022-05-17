import { Routes, Route } from '@angular/router';

import { AuthenticationGuard } from '@app/auth';
import { ShellComponent } from './shell.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './../api/services';
import { User } from '@app/api/models';
/**
 * Provides helper methods to create routes.
 */
@Injectable({
  providedIn: 'root',
})
export class Shell {
  constructor(private _auth: AuthService) {}

  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [AuthenticationGuard],
    };
  }

  getMe(): Observable<User> {
    return this._auth.authControllerGetMe();
  }
}
