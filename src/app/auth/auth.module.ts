import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, NgbModule, I18nModule, AuthRoutingModule],
  declarations: [AuthComponent, SignInComponent],
})
export class AuthModule {}
