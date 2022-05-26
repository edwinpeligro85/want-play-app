/* tslint:disable */
/* eslint-disable */
import { Post } from './post';
import { Profile } from './profile';
export interface PostRequest {
  _id: string;
  createdAt: string;
  owner: Profile;
  post: Post;
  updatedAt: string;
}
