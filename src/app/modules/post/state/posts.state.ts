import { Injectable } from '@angular/core';
import { Post } from '@app/api/models';
import { PostService } from '@app/api/services';
import { State, Action, StateContext, Selector, StateToken } from '@ngxs/store';
import { map, tap } from 'rxjs/operators';
import { PostModel } from '../post.model';
import { Posts } from './posts.actions';

export class PostsStateModel {
  public items!: PostModel[];
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
  constructor(private _post: PostService) {}

  @Selector()
  static posts(state: PostsStateModel): Post[] {
    return state.items;
  }

  @Action(Posts.FetchAll)
  fetchAll({ getState, setState }: StateContext<PostsStateModel>, { payload }: Posts.FetchAll) {
    return this._post.postsControllerFindAll(payload).pipe(
      map((response) => response.data),
      tap({
        next: (posts) => {
          if (posts) {
            const state = getState();
            setState({ items: [...state.items, ...posts.map((post) => new PostModel(post))] });
          }
        },
      })
    );
  }

  @Action(Posts.Add)
  add({ getState, setState }: StateContext<PostsStateModel>, { payload }: Posts.Add) {
    const state = getState();
    setState({ items: [...state.items] });
  }

  @Action(Posts.Delete)
  delete({ getState, patchState }: StateContext<PostsStateModel>, { id }: Posts.Delete) {
    patchState({
      items: getState().items.filter((post) => post._id !== id),
    });
  }
}
