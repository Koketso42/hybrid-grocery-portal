import { WidgetComponent } from './../widget.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-checkout-page',
	templateUrl: './checkout-page.component.html',
	styleUrls: [ './checkout-page.component.css' ]
})
export class CheckoutPageComponent implements OnInit, WidgetComponent {

	@Output() data: any;
	@Input() onNavigate: EventEmitter<any>;

	constructor() {}

	ngOnInit() {}
}
