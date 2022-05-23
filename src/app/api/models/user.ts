/* tslint:disable */
/* eslint-disable */
export interface User {
  _id: string;
  age?: number;
  email: string;
  facebookId?: string;
  firstName: string;
  gender?: 'male' | 'female';
  lastName?: string;
  status: 'active' | 'pending' | 'blocked';
}
