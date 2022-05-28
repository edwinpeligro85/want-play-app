/* tslint:disable */
/* eslint-disable */
import { City } from './city';
import { User } from './user';
export interface ProfileResponseDto {
  _id: string;
  aboutMe?: string;
  age?: number;
  birthDate?: string;
  city?: City;
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
