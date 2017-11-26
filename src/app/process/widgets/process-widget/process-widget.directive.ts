import { AfterViewInit, ComponentFactoryResolver, Directive, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { WidgetData } from './../widget-data.component';
import { WidgetComponent } from './../widget.component';

@Directive({
	selector: '[process-widget]',
	// template: ''
})
export class ProcessWidgetDirective implements AfterViewInit {

	@Input() widgetData: WidgetData;

	constructor(
		private _componentFactoryResolver: ComponentFactoryResolver,
		private viewContainerRef: ViewContainerRef
	) {	}

	ngAfterViewInit() {
		this.loadWidget(this.widgetData);
	}

	loadWidget(widgetItem: WidgetData) {
		const componentFactory = this._componentFactoryResolver.resolveComponentFactory(widgetItem.component);

		const componentRef = this.viewContainerRef.createComponent(componentFactory);
		const widget = <WidgetComponent>componentRef.instance;
		widget.data = widgetItem.data;
		componentRef.changeDetectorRef.detectChanges();
	}
}
