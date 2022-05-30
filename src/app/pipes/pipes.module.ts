import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeCasePipe } from './change-case/change-case.pipe';

@NgModule({
  declarations: [ChangeCasePipe],
  exports: [ChangeCasePipe],
  imports: [CommonModule],
})
export class PipesModule {}
