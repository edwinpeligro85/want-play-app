import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PostModule } from '@app/modules/post/post.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PostFilterComponent } from './components/post-filter/post-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PostModule,
    SharedModule,
    TranslateModule,
    HomeRoutingModule,
    Angulartics2Module,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgMultiSelectDropDownModule,
  ],
  declarations: [HomeComponent, PostFilterComponent],
})
export class HomeModule {}
