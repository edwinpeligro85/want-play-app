import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/auth/authentication.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public loading: boolean;
  public signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _authentication: AuthenticationService,
    private router: Router
  ) {
    this.createForm();
    this.loading = false;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      console.log(
        '🚀 ~ file: sign-up.component.ts ~ line 26 ~ SignUpComponent ~ onSubmit ~ this.signUpForm',
        this.signUpForm
      );
      return;
    }

    this.loading = true;

    this._authentication
      .register(this.signUpForm.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((user) => {
        console.log('🚀 ~ file: sign-up.component.ts ~ line 26 ~ SignUpComponent ~ .subscribe ~ user', user);
        setTimeout(() => this.router.navigate(['/auth/confirm/sign-up']), 300);
      });
  }

  private createForm() {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }
}
