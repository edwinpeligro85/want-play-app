import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService, ThirdPartyAuthenticateProvider } from '@app/auth/authentication.service';
import { Store } from '@ngxs/store';
import { Auth } from '@app/auth/state';

const log = new Logger('SignIn');

@UntilDestroy()
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  signInForm!: FormGroup;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private _store: Store
  ) {
    this.createForm();
  }

  ngOnInit() {}

  login() {
    this.isLoading = true;
    const { email, password } = this.signInForm.value;

    this._store
      .dispatch(new Auth.Signin(email, password))
      .pipe(
        finalize(() => {
          this.signInForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe({
        next: (state) => {
          log.debug(`${state.auth.user.firstName} successfully logged in`);
          this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
        },
        error: (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        },
      });
  }

  thirdPartyLogin(provider: ThirdPartyAuthenticateProvider) {
    this.authenticationService.thirdPartyAuthenticate(provider);
  }

  private createForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: false,
    });
  }
}
