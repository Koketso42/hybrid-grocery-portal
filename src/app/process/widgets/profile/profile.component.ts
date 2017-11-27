import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetComponent } from '../widget.component';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit, WidgetComponent {

  @Output() data: any;
	@Input() onNavigate: EventEmitter<any>;

	constructor() {}

	ngOnInit() {}
}
