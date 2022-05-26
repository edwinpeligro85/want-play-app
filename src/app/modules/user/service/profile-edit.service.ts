import { Injectable } from '@angular/core';
import { UpdateProfileDto, UpdateUserDto } from '@app/api/models';
import { LocationService, ProfileService, UserService } from '@app/api/services';

@Injectable({
  providedIn: 'root',
})
export class ProfileEditService {
  constructor(private _profile: ProfileService, private _user: UserService, private _location: LocationService) {}

  updateUser(id: string, body: UpdateUserDto) {
    return this._user.usersControllerUpdate({ id, body });
  }

  updateProfile(id: string, body: UpdateProfileDto) {
    return this._profile.profileControllerUpdate({ id, body });
  }

  getCity() {
    return this._location.locationControllerFindAllCities();
  }
}
