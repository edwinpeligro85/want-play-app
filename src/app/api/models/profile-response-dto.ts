/* tslint:disable */
/* eslint-disable */
import { User } from './user';
export interface ProfileResponseDto {
  _id: string;
  aboutMe?: string;
  age?: number;
  birthDate?: string;
  createdAt: string;
  followers: number;
  following: number;
  gender?: 'male' | 'female';
  nickname?: string;
  posts: number;
  socialMedias: Array<{}>;
  updatedAt: string;
  user: User;
}
