import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post/create-post.component';
import { CardPostComponent } from './card-post/card-post.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreatePostComponent, CardPostComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CreatePostComponent, CardPostComponent],
})
export class PostModule {}
