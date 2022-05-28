import { Component } from '@angular/core';
import { Auth, AuthState } from '@app/auth/state';
import { UserModel } from '@app/modules/user/user.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'shell-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent {
  @Select(AuthState.user) user$!: Observable<UserModel>;

  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(new Auth.Signout());
  }
}
