import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthState } from '@app/auth/state';
import { PostModel } from '@app/modules/post/post.model';
import { Posts, PostsState } from '@app/modules/post/state';
import { UserModel } from '@app/modules/user/user.model';
import { Select, Store } from '@ngxs/store';
import { StateReset } from 'ngxs-reset-plugin';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@shared';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @Select(PostsState.posts) posts$!: Observable<PostModel[]>;
  @Select(PostsState.loading) loading$!: Observable<boolean>;

  public user: UserModel | null = null;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(AuthState.user)
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.user = user;
        this.loadPosts();
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StateReset(PostsState));
  }

  onScroll() {
    const totalItems = this.store.selectSnapshot(PostsState.totalItems);
    const totalResult = this.store.selectSnapshot(PostsState.totalResult);

    if (totalItems < totalResult) {
      this.loadPosts();
    }
  }

  private loadPosts(): void {
    this.store.dispatch(
      new Posts.FetchAll({
        sort: '-created_at',
        filter: JSON.stringify({ city: { $eq: this.user?.profile.city?._id } }),
      })
    );
  }
}
