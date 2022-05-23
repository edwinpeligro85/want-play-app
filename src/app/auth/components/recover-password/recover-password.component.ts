import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/auth/authentication.service';
import { Color } from '@app/ui-elements/types';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent {
  public alert: { color: Color; message: string } | null;
  public loading: boolean;
  public emailControl: FormControl;

  constructor(private _auth: AuthenticationService, private router: Router) {
    this.alert = null;
    this.loading = false;
    this.emailControl = new FormControl('', [Validators.required, Validators.email]);
  }

  sendEmail(): void {
    if (this.emailControl.invalid) return;

    this.loading = true;

    this._auth
      .forgotPassword(this.emailControl.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        complete: () => {
          this.emailControl.disable();
          this.alert = {
            color: 'success',
            message: 'Se enviaron las instrucciones para recuperar tu contraseña.',
          };

          setTimeout(() => this.router.navigate(['/auth/sign-in']), 5000);
        },
        error: () => {
          this.alert = {
            color: 'danger',
            message: 'El correo no se encuentra registrado.',
          };
          setTimeout(() => (this.alert = null), 5000);
        },
      });
  }
}
