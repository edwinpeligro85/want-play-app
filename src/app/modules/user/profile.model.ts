import { City, Profile } from '@app/api/models';
import { UserModel } from './user.model';

export class ProfileModel implements Profile {
  '_id': string = '';
  age?: number;
  user!: UserModel;
  city?: City;
  gender?: 'male' | 'female';
  aboutMe?: string;
  nickname?: string;
  createdAt: string = new Date().toJSON();
  updatedAt: string = new Date().toJSON();
  birthDate?: string;
  socialMedias: {}[] = [];

  get pic(): string {
    return `https://ui-avatars.com/api/?name=${this.nickname}&color=00a74a&background=f5fbff`;
  }

  constructor(data: Partial<Profile> = {}) {
    Object.assign(this, data);

    if (data.user && typeof data.user !== 'string') {
      this.user = new UserModel(data.user);
    }
  }
}
