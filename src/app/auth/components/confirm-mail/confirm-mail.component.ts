import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpDto } from '@app/api/models';
import { AuthenticationService } from '@app/auth/authentication.service';
import { CredentialsService } from '@app/auth/credentials.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.scss'],
})
export class ConfirmMailComponent implements OnInit {
  public type: string;
  public data: SignUpDto | null = null;
  public error: boolean = false;
  public loading: boolean = true;

  constructor(
    private activateRoute: ActivatedRoute,
    private _auth: AuthenticationService,
    private _credentials: CredentialsService,
    private router: Router
  ) {
    this.type = this.activateRoute.snapshot.params['type'];
    this._auth.onSignUp.subscribe((data: SignUpDto | null) => {
      this.data = data;
    });
  }

  ngOnInit(): void {
    if (this.type == 'sign-up' && !this.data) {
      this.router.navigate(['/auth/sign-in']);
    }

    const url = this.router.parseUrl(this.router.url);
    const token = url.queryParams['token'];

    if (this.type == 'account') {
      this._auth
        .confirm(token)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: () => {
            this._credentials.setCredentials({ firstName: '', token: token });
            this._auth.getMe().subscribe(() => setTimeout(() => this.router.navigate(['/home']), 5000));
          },
          error: () => {
            this.error = true;
          },
        });
    } else {
      this.loading = false;
    }
  }
}
