import { Injectable } from '@angular/core';
import { Post } from '@app/api/models';
import { PostService } from '@app/api/services';
import { AuthState } from '@app/auth/state';
import { State, Action, StateContext, Selector, StateToken, Store } from '@ngxs/store';
import { finalize, map, tap } from 'rxjs/operators';
import { PostModel } from '../post.model';
import { Posts } from './posts.actions';

export class PostsStateModel {
  public next!: number;
  public page!: number;
  public total!: number;
  public items!: Post[];
  public loading!: boolean;
}

export const POSTS_STATE_TOKEN = new StateToken<PostsStateModel>('posts');

export const POSTS_STATE_DEFAULTS = {
  next: 0,
  page: -1,
  total: 0,
  items: [],
  loading: false,
};

@State<PostsStateModel>({
  name: POSTS_STATE_TOKEN,
  defaults: POSTS_STATE_DEFAULTS,
})
@Injectable()
export class PostsState {
  constructor(private _post: PostService, private store: Store) {}

  @Selector()
  static posts(state: PostsStateModel): PostModel[] {
    return state.items.map((post) => new PostModel(post));
  }

  @Selector()
  static totalResult(state: PostsStateModel): number {
    return state.total;
  }

  @Selector()
  static totalItems(state: PostsStateModel): number {
    return state.items.length;
  }

  @Selector()
  static loading(state: PostsStateModel): boolean {
    return state.loading;
  }

  @Action(Posts.FetchAll)
  fetchAll({ getState, patchState }: StateContext<PostsStateModel>, { payload }: Posts.FetchAll) {
    const state = getState();
    patchState({ loading: true });

    return this._post.postsControllerFindAll({ ...payload, page: state.next }).pipe(
      tap(({ pagination }) => {
        patchState({
          next: pagination?.next ?? state.next,
          page: pagination?.page ?? state.page,
          total: pagination?.total ?? state.total,
        });
      }),
      map((response) => response.data),
      tap({
        next: (posts) => {
          if (posts) {
            patchState({ items: [...state.items, ...posts] });
          }
        },
      }),
      finalize(() => patchState({ loading: false }))
    );
  }

  @Action(Posts.Add)
  add({ getState, patchState }: StateContext<PostsStateModel>, { payload }: Posts.Add) {
    return this._post.postsControllerCreate({ body: payload }).pipe(
      tap((post) => {
        const state = getState();
        post.owner = this.store.selectSnapshot(AuthState.user).profile;

        patchState({ items: [post, ...state.items] });
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
