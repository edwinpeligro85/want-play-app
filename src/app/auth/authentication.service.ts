import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpDto } from '@app/api/models';
import { AuthService } from '@app/api/services';
import { BehaviorSubject, finalize, Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public onSignUp: BehaviorSubject<SignUpDto | null> = new BehaviorSubject<SignUpDto | null>(null);
  constructor(private credentialsService: CredentialsService, private _auth: AuthService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    const data = {
      username: context.username,
      token: '123456',
    };
    this.credentialsService.setCredentials(data, context.remember);
    return of(data);
  }

  register(data: SignUpDto) {
    return this._auth.authControllerRegister({ body: data }).pipe(finalize(() => this.onSignUp.next(data)));
  }

  confirm(token: string) {
    return this._auth.authControllerConfirm({ token: token });
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
