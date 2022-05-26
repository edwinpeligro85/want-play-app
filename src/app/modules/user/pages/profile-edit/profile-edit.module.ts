import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileEditRoutingModule } from './profile-edit-routing.module';
import { ProfileEditComponent } from './profile-edit.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileEditComponent, PersonalInformationComponent, ChangePasswordComponent, SocialMediaComponent],
  imports: [CommonModule, ProfileEditRoutingModule, ReactiveFormsModule],
})
export class ProfileEditModule {}
