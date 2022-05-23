import { Component, Input } from '@angular/core';
import { Color } from '../types';

@Component({
  selector: 'ui-elements-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() public color: Color;
  @Input() public message: string;

  constructor() {
    this.color = 'primary';
    this.message = '';
  }
}
