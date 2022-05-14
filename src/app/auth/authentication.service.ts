import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseDto, SignUpDto } from '@app/api/models';
import { AuthService } from '@app/api/services';
import { BehaviorSubject, finalize, map, Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  email: string;
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
    return this._auth.authControllerLogin({ body: context }).pipe(
      map((login: LoginResponseDto) => {
        const data = {
          username: login.user.email,
          token: login.accessToken,
        };
        this.credentialsService.setCredentials(data, context.remember);
        return data;
      })
    );
  }

  register(body: SignUpDto) {
    return this._auth.authControllerRegister({ body }).pipe(finalize(() => this.onSignUp.next(body)));
  }

  confirm(token: string) {
    return this._auth.authControllerConfirm({ token });
  }

  getMe() {
    //TODO: definir reglas isAuth
    return this._auth.authControllerGetMe();
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
