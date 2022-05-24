import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ProfileEditComponent } from './profile-edit.component';
import { SocialMediaComponent } from './social-media/social-media.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileEditComponent,
    children: [
      { path: 'personal-information', component: PersonalInformationComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'social-media', component: SocialMediaComponent },
      { path: '**', redirectTo: 'personal-information', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileEditRoutingModule {}
