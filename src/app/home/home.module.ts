import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PostModule } from '@app/modules/post/post.module';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, Angulartics2Module, HomeRoutingModule, PostModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
