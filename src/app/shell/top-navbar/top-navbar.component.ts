import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/auth';

@Component({
  selector: 'shell-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent {
  constructor(private router: Router, private _auth: AuthenticationService) {}

  logout() {
    this._auth.logout().subscribe(() => this.router.navigate(['/auth/sign-in'], { replaceUrl: true }));
  }
}
