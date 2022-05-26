/* tslint:disable */
/* eslint-disable */
export interface UpdatePostDto {
  body?: string;
  city?: string;
  status?: 'open' | 'pause' | 'finished';
  type?: 'want' | 'need';
}
