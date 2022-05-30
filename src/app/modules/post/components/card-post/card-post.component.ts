import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { PostModel } from '../../post.model';
import { Posts } from '../../state';

@Component({
  selector: 'card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss'],
})
export class CardPostComponent {
  @Input() public post!: PostModel;
  @Input() public isOwn!: boolean;

  constructor(private store: Store) {}

  public updatePost(body: string) {
    if (this.post.body === body) return;

    this.store.dispatch(new Posts.Edit(this.post._id, { body }));
  }

  public removePost() {
    this.store.dispatch(new Posts.Delete(this.post._id));
  }

  public inputBodyValidator(value: string): string | null {
    return null;
  }
}
