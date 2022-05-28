import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { UserAction } from './user.actions';

export class UserStateModel {
  public items!: string[];
}

const defaults = {
  items: [],
};

@State<UserStateModel>({
  name: 'user',
  defaults,
})
@Injectable()
export class UserState {
  @Action(UserAction)
  add({ getState, setState }: StateContext<UserStateModel>, { payload }: UserAction) {
    const state = getState();
    setState({ items: [...state.items, payload] });
  }
}
