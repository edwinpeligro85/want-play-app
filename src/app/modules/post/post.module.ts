import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CardPostComponent } from './components/card-post/card-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [CreatePostComponent, CardPostComponent],
  imports: [CommonModule, ReactiveFormsModule, SweetAlert2Module, NgxLoadingModule],
  exports: [CreatePostComponent, CardPostComponent],
})
export class PostModule {}
