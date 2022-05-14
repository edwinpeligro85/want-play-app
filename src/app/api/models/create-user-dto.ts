/* tslint:disable */
/* eslint-disable */
export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  status?: 'active' | 'pending' | 'blocked';
}
