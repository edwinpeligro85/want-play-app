import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from '@app/auth/authentication.service';

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
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.signInForm.value);
    login$
      .pipe(
        finalize(() => {
          this.signInForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe({
        next: (credentials) => {
          log.debug(`${credentials.username} successfully logged in`);
          this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
        },
        error: (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        },
      });
  }

  private createForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: false,
    });
  }
}
