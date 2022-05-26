import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  declarations: [ProfileComponent, TimelineComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
