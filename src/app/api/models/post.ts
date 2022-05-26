/* tslint:disable */
/* eslint-disable */
import { City } from './city';
import { PostRequest } from './post-request';
import { Profile } from './profile';
export interface Post {
  _id: string;
  body: string;
  city: City;
  owner: Profile;
  requests: Array<PostRequest>;
  status: 'open' | 'pause' | 'finished';
  type: 'want' | 'need';
}
