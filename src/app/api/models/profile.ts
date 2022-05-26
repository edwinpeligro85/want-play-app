/* tslint:disable */
/* eslint-disable */
import { User } from './user';
export interface Profile {
  _id: string;
  aboutMe?: string;
  age?: number;
  birthDate?: string;
  createdAt: string;
  gender?: 'male' | 'female';
  nickname?: string;
  socialMedias: Array<{}>;
  updatedAt: string;
  user: User;
}
