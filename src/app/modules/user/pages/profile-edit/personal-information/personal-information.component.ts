import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserDto } from '@app/api/models';
import { AuthenticationService } from '@app/auth';
import { ProfileEditService } from '@app/modules/user/service/profile-edit.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  public userForm: FormGroup;
  public profileForm: FormGroup;
  public user: any;

  constructor(
    private formBuilder: FormBuilder,
    private _profile: ProfileEditService,
    private _auth: AuthenticationService
  ) {
    this._auth.getMe().subscribe((user) => (this.user = user));

    this.userForm = this.formBuilder.group({
      firstName: [this.user.firstName ?? '', Validators.required],
      lastName: [this.user.lastName ?? '', Validators.required],
      email: [this.user.email ?? '', Validators.required],
    });

    this.profileForm = this.formBuilder.group({
      nickname: [this.user.profile.nickname ?? '', Validators.required],
      birthDate: [this.user.profile.birthDate ?? '', Validators.required],
      gender: [this.user.profile.gender ?? '', Validators.required],
      aboutMe: [this.user.profile.aboutMe ?? '', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.profileForm.invalid) return;
    const form = this.profileForm.value;

    const body = {
      firstName: form.firstName,
      lastName: form.lastName,
    };

    this._profile.updateUser(this.user._id, body).subscribe({
      error: () => {},
      complete: () => {},
    });
  }

  onUpdateProfile() {}
}
