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

export type ThirdPartyAuthenticateProvider = 'facebook';

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
        const data: Credentials = {
          firstName: login.user.firstName,
          lastName: login.user.lastName,
          token: login.accessToken,
          pic: `https://ui-avatars.com/api/?name=${login.user.firstName}%20${login.user.lastName}&color=00a74a&background=f5fbff`,
        };
        this.credentialsService.setCredentials(data, context.remember);
        return data;
      })
    );
  }

  thirdPartyAuthenticate(provider: ThirdPartyAuthenticateProvider): void {
    switch (provider) {
      case 'facebook':
        this._auth.authControllerFacebookLogin().subscribe();
        break;

      default:
        // TODO: Show Alert Message
        break;
    }
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

  forgotPassword(email: string): Observable<boolean> {
    return this._auth.authControllerForgotPassword({ body: { email } });
  }

  changePassword(password: string): Observable<boolean> {
    return this._auth.authControllerChangePassword({ body: { password } });
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
