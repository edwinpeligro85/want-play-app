import { Component, OnInit } from '@angular/core';
import { User } from '@app/api/models';
import { Shell } from './shell.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  public user: User | undefined;

  constructor(private _shell: Shell) {}

  ngOnInit() {
    // this.loadUser();
  }

  loadUser() {
    this._shell.getMe().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
