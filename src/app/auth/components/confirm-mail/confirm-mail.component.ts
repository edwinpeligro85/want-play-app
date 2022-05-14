import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpDto } from '@app/api/models';
import { AuthenticationService } from '@app/auth/authentication.service';

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.scss'],
})
export class ConfirmMailComponent implements OnInit {
  public type: string;
  public data: SignUpDto | null = null;
  public error: Boolean = false;

  constructor(private activateRoute: ActivatedRoute, private _auth: AuthenticationService, private router: Router) {
    this.type = this.activateRoute.snapshot.params['type'];
    this._auth.onSignUp.subscribe((data: SignUpDto | null) => {
      this.data = data;
    });
  }

  ngOnInit(): void {
    if (this.type == 'sign-up' && !this.data) this.router.navigate(['/auth/sign-in']);

    if (this.type == 'account') {
      const url = this.router.parseUrl(this.router.url);
      const token = url.queryParams['token'];
      this._auth.confirm(token).subscribe({
        next: (confirm) => {
          if (confirm) {
            this._auth.getMe().subscribe();
          }
        },
        error: () => {
          this.error = true;
        },
      });
    }
  }
}
