import { Component, OnInit } from '@angular/core';
import { Message } from '@app/api/models';
import { AuthState } from '@app/auth/state';
import { ProfileModel } from '@app/modules/user/profile.model';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ChatState } from '../../state';
import { MessagesGroup } from '../../state/interfaces';

@Component({
  selector: 'chat-pane-content',
  templateUrl: './chat-pane-content.component.html',
  styleUrls: ['./chat-pane-content.component.scss'],
})
export class ChatPaneContentComponent implements OnInit {
  @Select(ChatState.messagesGroup) messagesGroup$!: Observable<MessagesGroup[]>;
  @SelectSnapshot(AuthState.profile) profile!: any;

  constructor() {}

  ngOnInit(): void {}
}
