/* tslint:disable */
/* eslint-disable */
export interface CreatePostDto {
  body: string;
  city: string;
  status?: 'open' | 'pause' | 'finished';
  type: 'want' | 'need';
}
