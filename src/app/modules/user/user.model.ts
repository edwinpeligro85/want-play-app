import { User } from '@app/api/models';
import { ProfileModel } from './profile.model';

export class UserModel implements User {
  _id: string = '';
  email: string = '';
  status: 'active' | 'pending' | 'blocked' = 'active';
  profile!: ProfileModel;
  firstName: string = '';
  lastName?: string;
  createdAt: string = new Date().toJSON();
  updatedAt: string = new Date().toJSON();
  facebookId?: string;

  get pic(): string {
    return `https://ui-avatars.com/api/?name=${this.firstName}%20${this.lastName}&color=00a74a&background=f5fbff`;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(data: Partial<User> = {}) {
    Object.assign(this, data);

    if (data.profile && typeof data.profile !== 'string') {
      this.profile = new ProfileModel(data.profile);
    }
  }

  getName(): string {
    return this.firstName;
  }
}
