import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FriendsComponent } from './friends/friends.component';
import { ProfileComponent } from './profile.component';
import { TimelineComponent } from './timeline/timeline.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'timeline', component: TimelineComponent },
      { path: 'about', component: AboutComponent },
      { path: 'friends', component: FriendsComponent },
      { path: '**', redirectTo: 'timeline', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
