import { Component, OnInit } from '@angular/core';
import { AuthState } from '@app/auth/state';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { UserModel } from '../../user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @SelectSnapshot(AuthState.user) user!: UserModel;

  constructor() {}

  ngOnInit(): void {}
}
