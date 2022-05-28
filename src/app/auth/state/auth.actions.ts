export namespace Auth {
  export class LoadUser {
    static readonly type = '[Auth] Load user';
  }

  export class Signin {
    static readonly type = '[Auth] Signin';

    constructor(public email: string, public password: string) {}
  }

  export class Signout {
    static readonly type = '[Auth] Signout';
  }
}
