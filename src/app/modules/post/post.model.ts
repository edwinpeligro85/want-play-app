import { City, Post, PostRequest, Profile } from '@app/api/models';

export class PostModel implements Post {
  '_id': string = '';
  body: string = '';
  city: City = {} as any;
  owner: Profile = {} as any;
  requests: PostRequest[] = [];
  status: 'open' | 'pause' | 'finished' = 'open';
  type: 'want' | 'need' = 'want';

  get pic(): string {
    return `https://ui-avatars.com/api/?name=${this.owner.nickname}&color=00a74a&background=f5fbff`;
  }

  get statusLabel(): string {
    return this.type === 'want' ? 'Want play' : 'Need player´s';
  }

  constructor(data: Partial<Post> = {}) {
    Object.assign(this, data);
  }
}
