import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { AuthComponent } from './auth.component';
import { ConfirmMailComponent } from './components/confirm-mail/confirm-mail.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'sign-in', component: SignInComponent, data: { title: marker('Login') } },
      { path: 'sign-up', component: SignUpComponent, data: { title: marker('Login') } },
      { path: 'confirm/:type', component: ConfirmMailComponent, data: { title: marker('Login') } },
      { path: 'recover-password', component: RecoverPasswordComponent, data: { title: marker('Login') } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
