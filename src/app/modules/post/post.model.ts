import { City, Post, PostRequest, Profile } from '@app/api/models';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export class PostModel implements Post {
  _id: string = '';
  body: string = '';
  city: City = {} as any;
  type: 'want' | 'need' = 'want';
  owner: Profile = {} as any;
  status: 'open' | 'pause' | 'finished' = 'open';
  requests: PostRequest[] = [];
  createdAt: string = new Date().toJSON();
  updatedAt: string = new Date().toJSON();

  get pic(): string {
    return `https://ui-avatars.com/api/?name=${this.owner.nickname}&color=00a74a&background=f5fbff`;
  }

  get statusLabel(): string {
    return this.type === 'want' ? 'Want play' : 'Need player´s';
  }

  get createdAtLabel(): string {
    return formatDistanceToNow(new Date(this.createdAt), { addSuffix: true, locale: es });
  }

  get requestsIds(): string[] {
    return this.requests.map((request) => request.owner._id);
  }

  constructor(data: Partial<Post> = {}) {
    Object.assign(this, data);
  }
}
