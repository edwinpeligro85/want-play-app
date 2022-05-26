import { Injectable } from '@angular/core';
import { UpdateUserDto } from '@app/api/models';
import { ProfileService, UserService } from '@app/api/services';

@Injectable({
  providedIn: 'root',
})
export class ProfileEditService {
  constructor(private _profile: ProfileService, private _user: UserService) {}

  updateUser(id: string, body: UpdateUserDto) {
    return this._user.usersControllerUpdate({ id, body });
  }
}
