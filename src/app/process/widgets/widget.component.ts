import { EventEmitter } from '@angular/core';

export interface WidgetComponent {
  data: any;
  onNavigate: EventEmitter<any>;
}
