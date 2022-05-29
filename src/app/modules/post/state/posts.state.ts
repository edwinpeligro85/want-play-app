import { Injectable } from '@angular/core';
import { Post } from '@app/api/models';
import { PostService } from '@app/api/services';
import { AuthState } from '@app/auth/state';
import { State, Action, StateContext, Selector, StateToken, Store } from '@ngxs/store';
import { map, tap } from 'rxjs/operators';
import { PostModel } from '../post.model';
import { Posts } from './posts.actions';

export class PostsStateModel {
  public items!: Post[];
}

export const POSTS_STATE_TOKEN = new StateToken<PostsStateModel>('posts');

const defaults = {
  items: [],
};

@State<PostsStateModel>({
  name: POSTS_STATE_TOKEN,
  defaults,
})
@Injectable()
export class PostsState {
  constructor(private _post: PostService, private store: Store) {}

  @Selector()
  static posts(state: PostsStateModel): PostModel[] {
    return state.items.map((post) => new PostModel(post));
  }

  @Action(Posts.FetchAll)
  fetchAll({ getState, setState }: StateContext<PostsStateModel>, { payload }: Posts.FetchAll) {
    return this._post.postsControllerFindAll(payload).pipe(
      map((response) => response.data),
      tap({
        next: (posts) => {
          if (posts) {
            const state = getState();
            setState({ items: [...state.items, ...posts] });
          }
        },
      })
    );
  }

  @Action(Posts.Add)
  add({ getState, setState }: StateContext<PostsStateModel>, { payload }: Posts.Add) {
    return this._post.postsControllerCreate({ body: payload }).pipe(
      tap((post) => {
        const state = getState();
        post.owner = this.store.selectSnapshot(AuthState.user).profile;

        setState({ items: [post, ...state.items] });
      })
    );
  }

  @Action(Posts.Delete)
  delete({ getState, patchState }: StateContext<PostsStateModel>, { id }: Posts.Delete) {
    patchState({
      items: getState().items.filter((post) => post._id !== id),
    });
  }
}
