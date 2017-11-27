import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetComponent } from '../widget.component';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: [ './transactions.component.css' ]
})
export class TransactionsComponent implements OnInit, WidgetComponent {

  @Output() data: any;
	@Input() onNavigate: EventEmitter<any>;

	constructor() {}

	ngOnInit() {}
}
