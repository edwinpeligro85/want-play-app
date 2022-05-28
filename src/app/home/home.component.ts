import { Component, OnInit } from '@angular/core';
import { PostModel } from '@app/modules/post/post.model';
import { Posts, PostsState } from '@app/modules/post/state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Select(PostsState.posts)
  public posts$!: Observable<PostModel[]>;

  public isLoading = false;

  constructor(private store: Store) {
    // this.posts$ = this.store.select<Post[]>((state) => state.posts.posts);
  }

  ngOnInit() {
    this.store.dispatch(new Posts.FetchAll());
  }
}
