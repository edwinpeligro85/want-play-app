/* tslint:disable */
/* eslint-disable */
import { SocialMedia } from './social-media';
export interface UpdateProfileDto {
  aboutMe?: string;
  birthDate?: string;
  gender?: 'male' | 'female';
  nickname?: string;
  socialMedias?: Array<SocialMedia>;
}
