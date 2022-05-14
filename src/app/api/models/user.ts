/* tslint:disable */
/* eslint-disable */
export interface User {
  age?: number;
  email: string;
  firstName: string;
  gender?: 'male' | 'female';
  lastName?: string;
  status: 'active' | 'pending' | 'blocked';
}
