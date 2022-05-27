import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post/create-post.component';
import { CardPostComponent } from './card-post/card-post.component';

@NgModule({
  declarations: [CreatePostComponent, CardPostComponent],
  imports: [CommonModule],
  exports: [CreatePostComponent, CardPostComponent],
})
export class PostModule {}
