import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, CredentialsService } from '@app/auth';
import { CustomValidators } from '@app/common/validators';
import { Color } from '@app/ui-elements/types';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public passwordForm: FormGroup;
  public alert: { color: Color; message: string } | null;

  constructor(private formBuilder: FormBuilder, private _auth: AuthenticationService) {
    this.alert = null;
    this.passwordForm = this.formBuilder.group(
      {
        currentPassword: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: CustomValidators.checkPasswords }
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.passwordForm.invalid) {
      this.alert = {
        color: 'danger',
        message: 'Invalid Form',
      };
      return;
    }

    this._auth.getMe().subscribe({
      next: (me) => {
        const login = {
          email: me.email,
          password: this.passwordForm.value.currentPassword,
          remember: false,
        };
        this._auth.login(login).subscribe({
          next: () => {
            this._auth.changePassword(this.passwordForm.value.password).subscribe({
              next: () => {
                this.passwordForm.reset();
                this.alert = {
                  color: 'success',
                  message: 'Change password successfully',
                };
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
          },
          error: (e: HttpErrorResponse) => {
            let message = e.message;

            if (e.status === 401) {
              message = 'Invalid Current Password';
            }

            this.alert = {
              color: 'danger',
              message,
            };

            setTimeout(() => (this.alert = null), 3000);
          },
        });
      },
    });
  }
}
