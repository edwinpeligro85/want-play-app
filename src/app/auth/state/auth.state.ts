import { Injectable } from '@angular/core';
import { User } from '@app/api/models';
import { AuthService } from '@app/api/services';
import { UserModel } from '@app/modules/user/user.model';
import { State, Action, StateContext, Selector, StateToken } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Auth } from './auth.actions';

const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('auth');

export class AuthStateModel {
  public user!: User | null;
  public token!: string;
}

export const AUTH_STATE_DEFAULTS = {
  user: null,
  token: '',
};

@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: AUTH_STATE_DEFAULTS,
})
@Injectable()
export class AuthState {
  constructor(private _auth: AuthService) {}

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static token(state: AuthStateModel): string {
    return state.token;
  }

  @Selector()
  static user(state: AuthStateModel): UserModel {
    return new UserModel(state.user ?? {});
  }

  @Action(Auth.LoadUser)
  getUserByToken({ patchState, dispatch, getState }: StateContext<AuthStateModel>) {
    const state = getState();

    if (state.token) {
      return this._auth.authControllerGetMe().pipe(
        tap({
          next: (user) => patchState({ user }),
          error: () => dispatch(new Auth.Signout()),
        })
      );
    }

    return dispatch(new Auth.Signout());
  }

  @Action(Auth.Signin)
  login({ patchState }: StateContext<AuthStateModel>, { email, password }: Auth.Signin) {
    return this._auth
      .authControllerLogin({ body: { email, password } })
      .pipe(tap(({ accessToken: token, user }) => patchState({ token, user })));
  }
}
