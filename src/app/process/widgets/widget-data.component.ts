import { Type } from '@angular/core';
import { WidgetComponent } from './widget.component';

export class WidgetData {

  constructor(public component: Type<WidgetComponent>, public data: any, public name: string, public key: string) { }
}
