import { Component, OnInit } from '@angular/core';
import { AuthState } from '@app/auth/state';
import { UserModel } from '@app/modules/user/user.model';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'chat-search',
  templateUrl: './chat-search.component.html',
  styleUrls: ['./chat-search.component.scss'],
})
export class ChatSearchComponent implements OnInit {
  @Select(AuthState.user) user$!: Observable<UserModel>;

  constructor() {}

  ngOnInit(): void {}
}
