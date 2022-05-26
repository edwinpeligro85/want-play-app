import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/auth/authentication.service';
import { CredentialsService } from '@app/auth/credentials.service';
import { CustomValidators } from '@app/common';
import { Color } from '@app/ui-elements/types';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  private token: string | null;
  public alert: { color: Color; message: string } | null;
  public loading: boolean;
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _auth: AuthenticationService,
    private _credentials: CredentialsService
  ) {
    this.token = this.activatedRoute.snapshot.queryParams['token'];
    this.alert = null;
    this.loading = false;

    if (!this.token) {
      this.goToLogin();
    }

    this.createForm();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this._credentials.setCredentials({ firstName: '', token: this.token ?? '' });

    this._auth
      .changePassword(this.form.value.password)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.form.disable();
          this.alert = {
            color: 'success',
            message: 'Change password successfully',
          };

          this._credentials.setCredentials();
          setTimeout(() => this.goToLogin(), 3000);
        },
        error: (e: HttpErrorResponse) => {
          let message = e.message;

          if (e.status === 401) {
            message = 'Token is invalid or expired';
          }

          this.alert = {
            color: 'danger',
            message,
          };

          setTimeout(() => (this.alert = null), 3000);
        },
      });
  }

  private createForm(): void {
    this.form = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: CustomValidators.checkPasswords }
    );
  }

  private goToLogin(): void {
    this.router.navigate(['/auth/sign-in']);
  }
}
