/* tslint:disable */
/* eslint-disable */
import { Profile } from './profile';
export interface Chat {
  _id: string;
  createdAt: string;
  members: Array<Profile>;
  updatedAt: string;
}
