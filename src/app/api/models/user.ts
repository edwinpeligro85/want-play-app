/* tslint:disable */
/* eslint-disable */
import { Profile } from './profile';
export interface User {
  _id: string;
  createdAt: string;
  email: string;
  facebookId?: string;
  firstName: string;
  lastName?: string;
  profile: Profile;
  status: 'active' | 'pending' | 'blocked';
  updatedAt: string;
}
