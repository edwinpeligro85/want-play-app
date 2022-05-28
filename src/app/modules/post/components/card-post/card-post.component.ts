import { Component, Input, OnInit } from '@angular/core';
import { ProfileModel } from '@app/modules/user/profile.model';
import { Store } from '@ngxs/store';
import { PostModel } from '../../post.model';
import { Posts } from '../../state';

@Component({
  selector: 'card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss'],
})
export class CardPostComponent implements OnInit {
  @Input() public post!: PostModel;
  @Input() public isOwn!: boolean;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  public removePost() {
    this.store.dispatch(new Posts.Delete(this.post._id));
  }
}
