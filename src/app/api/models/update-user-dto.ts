/* tslint:disable */
/* eslint-disable */
export interface UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  password?: string;
  status?: 'active' | 'pending' | 'blocked';
}
