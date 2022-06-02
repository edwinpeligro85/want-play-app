import { Injectable } from '@angular/core';
import { Chat as ChatModel, Message } from '@app/api/models';
import { ChatService, ProfileService } from '@app/api/services';
import { AuthState } from '@app/auth/state';
import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { finalize, tap } from 'rxjs';
import { Chat } from './chat.actions';
import { ChatModel as ChatCustomModel } from '../chat.model';

export class ChatStateModel {
  public chat!: ChatModel | null;
  public chats!: ChatModel[];
  public messages!: Message[];
  public loadingMessages!: boolean;
}

const defaults = {
  chat: null,
  chats: [],
  messages: [],
  loadingMessages: false,
};

@State<ChatStateModel>({
  name: 'chat',
  defaults,
})
@Injectable()
export class ChatState {
  constructor(private _chat: ChatService, private _profile: ProfileService, private store: Store) {}

  @Selector()
  static chats(state: ChatStateModel): ChatCustomModel[] {
    return state.chats.map((chat) => new ChatCustomModel(chat));
  }

  @Action(Chat.FetchAll)
  fetchAll({ patchState }: StateContext<ChatStateModel>) {
    const profile = this.store.selectSnapshot(AuthState.profile);

    return this._profile.profileControllerFindChats({ id: profile._id }).pipe(
      tap((chats) => {
        patchState({ chats });
      })
    );
  }

  @Action(Chat.Open)
  open({ patchState, getState }: StateContext<ChatStateModel>, { id }: Chat.Open) {
    patchState({ loadingMessages: true });

    return this._chat.chatControllerGetMessages({ id }).pipe(
      tap((messages) => {
        patchState({
          chat: getState().chats.find((chat) => chat._id == id),
          messages,
        });
      }),
      finalize(() => patchState({ loadingMessages: false }))
    );
  }

  @Action(Chat.Add)
  add({ getState, patchState }: StateContext<ChatStateModel>, { message }: Chat.Add) {
    const state = getState();

    patchState({ messages: [...state.messages, message] });
  }
}
