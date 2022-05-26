import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, CredentialsService } from '@app/auth';

@Component({
  selector: 'shell-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent {
  get fullName(): string | null {
    const credentials = this._credentials.credentials;
    return credentials ? `${credentials.firstName} ${credentials.lastName}` : null;
  }

  get pic(): string | null {
    return this._credentials.pic;
  }

  constructor(private router: Router, private _auth: AuthenticationService, private _credentials: CredentialsService) {}

  logout() {
    this._auth.logout().subscribe(() => this.router.navigate(['/auth/sign-in'], { replaceUrl: true }));
  }
}
