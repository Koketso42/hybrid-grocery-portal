import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetComponent } from '../widget.component';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit, WidgetComponent {

  @Output() data: any;
	@Input() onNavigate: EventEmitter<any>;

	constructor() {}

	ngOnInit() {}
}
