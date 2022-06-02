import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { ChatAction } from './chat.actions';

export class ChatStateModel {
  public items!: string[];
}

const defaults = {
  items: [],
};

@State<ChatStateModel>({
  name: 'chat',
  defaults,
})
@Injectable()
export class ChatState {
  @Action(ChatAction)
  add({ getState, setState }: StateContext<ChatStateModel>, { payload }: ChatAction) {
    const state = getState();
    setState({ items: [...state.items, payload] });
  }
}
