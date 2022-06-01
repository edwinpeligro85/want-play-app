import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { finalize } from 'rxjs/operators';
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
  @Input() public iHasRequested!: boolean;

  public loading = false;

  constructor(private store: Store) {}

  public sendRequest(): void {
    this.loading = true;
    this.store.dispatch(new Posts.SendRequest(this.post._id)).pipe(finalize(() => (this.loading = false)));
  }

  public updatePost(body: string) {
    if (this.post.body === body) return;

    this.loading = true;
    this.store.dispatch(new Posts.Edit(this.post._id, { body })).pipe(finalize(() => (this.loading = false)));
  }

  public removePost() {
    this.loading = true;
    this.store.dispatch(new Posts.Delete(this.post._id)).pipe(finalize(() => (this.loading = false)));
  }

  public inputBodyValidator(value: string): string | null {
    return null;
  }
}
