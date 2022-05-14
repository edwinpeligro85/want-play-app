/* tslint:disable */
/* eslint-disable */
export interface UpdateUserDto {
  email?: string;
  name?: string;
  password?: string;
  status?: 'active' | 'pending' | 'blocked';
}
