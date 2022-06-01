/* tslint:disable */
/* eslint-disable */
import { Chat } from './chat';
import { Profile } from './profile';
export interface Message {
  _id: string;
  createdAt: string;
  from: Profile;
  message: string;
  to: Chat;
  updatedAt: string;
}
