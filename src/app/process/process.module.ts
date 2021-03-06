import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProcessRoutingModule } from './process-routing.module';
import { BrandModule } from '../brand/brand.module';
import { ProcessPageComponent } from './process-page/process-page.component';
import { ProcessWidgetDirective } from './widgets/process-widget/process-widget.directive';
import { widgetComponents } from './widgets/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [ CommonModule, ProcessRoutingModule, FormsModule, ReactiveFormsModule, BrandModule, NgbModule ],
  declarations: [ ...widgetComponents, ProcessPageComponent, ProcessWidgetDirective ],
  entryComponents: [ ...widgetComponents ]
})
export class ProcessModule { }
