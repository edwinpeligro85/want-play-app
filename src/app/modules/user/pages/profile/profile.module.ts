import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AboutComponent } from './about/about.component';
import { FriendsComponent } from './friends/friends.component';

@NgModule({
  declarations: [ProfileComponent, TimelineComponent, AboutComponent, FriendsComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
