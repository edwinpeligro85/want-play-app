import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChatService } from '@app/api/services';
import { AuthState } from '@app/auth/state';
import { Store } from '@ngxs/store';
import { ChatState } from '../../state';

@Component({
  selector: 'chat-pane-footer',
  templateUrl: './chat-pane-footer.component.html',
  styleUrls: ['./chat-pane-footer.component.scss'],
})
export class ChatPaneFooterComponent implements OnInit {
  public messageControl: FormControl;

  constructor(private _chat: ChatService, private store: Store) {
    this.messageControl = new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(250),
    ]);
  }

  ngOnInit(): void {}

  sendMessage() {
    if (this.messageControl.invalid) return;

    const chat = this.store.selectSnapshot(ChatState.chat);
    const profile = this.store.selectSnapshot(AuthState.profile);

    this._chat
      .chatControllerCreateMessage({
        id: chat?._id ?? '',
        body: {
          from: profile._id,
          message: this.messageControl.value,
        },
      })
      .subscribe(() => this.messageControl.reset());
  }
}
