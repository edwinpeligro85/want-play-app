import { Component, OnInit } from '@angular/core';
import { AuthState } from '@app/auth/state';
import { PostModel } from '@app/modules/post/post.model';
import { Posts, PostsState } from '@app/modules/post/state';
import { UserModel } from '@app/modules/user/user.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Select(AuthState.user) user$!: Observable<UserModel>;
  @Select(PostsState.posts) posts$!: Observable<PostModel[]>;
  @Select(PostsState.loading) loading$!: Observable<boolean>;

  public isLoading = false;

  constructor(private store: Store) {}

  ngOnInit() {
    this.loadPosts();
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
      })
    );
  }
}
