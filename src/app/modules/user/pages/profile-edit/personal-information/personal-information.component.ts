import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from '@app/api/models';
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
  public age: number = 0;
  public city: City[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _profile: ProfileEditService,
    private _auth: AuthenticationService
  ) {
    this._profile.getCity().subscribe((city) => (this.city = city));

    this._auth.getMe().subscribe((user) => {
      this.user = user;
      this.loadData();
    });

    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.profileForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      aboutMe: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  loadData() {
    const form = this.userForm;
    const profileForm = this.profileForm;

    form.get('firstName')?.setValue(this.user.firstName);
    form.get('lastName')?.setValue(this.user.lastName);
    form.get('email')?.setValue(this.user.email);

    profileForm.get('birthDate')?.setValue(this.user.profile.birthDate);
    profileForm.get('nickname')?.setValue(this.user.profile.nickname);
    profileForm.get('aboutMe')?.setValue(this.user.profile.aboutMe);
    profileForm.get('country')?.setValue(this.user.profile.country);
    profileForm.get('gender')?.setValue(this.user.profile.gender);
    profileForm.get('city')?.setValue(this.user.profile.city);
    this.age = this.user.profile.age;
  }

  onSubmit() {
    if (this.userForm.invalid) return;
    const form = this.userForm.value;

    const body = {
      firstName: form.firstName,
      lastName: form.lastName,
    };

    this._profile.updateUser(this.user._id, body).subscribe({
      error: () => {},
      complete: () => {},
    });
  }

  onBirthdateChange(event: any) {
    this.age = Number(this.CalculateAge(event.target.value));
    console.log(event.target.value, this.age);
  }

  onUpdateProfile() {
    if (this.userForm.invalid) return;
    const form = this.profileForm.value;

    const body = {
      birthDate: form.birthDate,
      nickname: form.nickname,
      aboutMe: form.aboutMe,
      gender: form.gender,
      city: form.city,
    };

    this._profile.updateProfile(this.user.profile._id, body).subscribe({
      error: () => {},
      complete: () => {},
    });

    console.log(this.profileForm.value);
  }

  CalculateAge(date: Date): number {
    const today: Date = new Date();
    const birthDate: Date = new Date(date);
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
