import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProcessRoutingModule } from './process-routing.module';
import { BrandModule } from '../brand/brand.module';
import { ProcessPageComponent } from './process-page/process-page.component';
import { ProcessWidgetDirective } from './widgets/process-widget/process-widget.directive';
import { widgetComponents } from './widgets/index';
import { CatalogueComponent } from './widgets/catalogue/catalogue.component';

@NgModule({
  imports: [ CommonModule, ProcessRoutingModule, FormsModule, ReactiveFormsModule, BrandModule ],
  declarations: [ ...widgetComponents, ProcessPageComponent, ProcessWidgetDirective, CatalogueComponent ],
  entryComponents: [ ...widgetComponents ]
})
export class ProcessModule { }
