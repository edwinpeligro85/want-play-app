import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Chat } from '../../state';
import { ChatState } from '../../state';
import { ChatModel } from '../../chat.model';

@Component({
  selector: 'chat-sidebar-channel',
  templateUrl: './chat-sidebar-channel.component.html',
  styleUrls: ['./chat-sidebar-channel.component.scss'],
})
export class ChatSidebarChannelComponent implements OnInit {
  @Select(ChatState.chats) chats$!: Observable<ChatModel[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(Chat.FetchAll);
  }

  openChat(id: string): void {
    this.store.dispatch(new Chat.Open(id));
  }
}
