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

  public removePost() {
    this.store.dispatch(new Posts.Delete(this.post._id));
  }
}
