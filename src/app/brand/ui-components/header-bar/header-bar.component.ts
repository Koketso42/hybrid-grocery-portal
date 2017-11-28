import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header-bar',
	templateUrl: './header-bar.component.html',
	styleUrls: [ './header-bar.component.css' ]
})
export class HeaderBarComponent implements OnInit {

	@Output() onNavigate: EventEmitter<any> = new EventEmitter();

	constructor(private router: Router) {}

	ngOnInit() {}

	onNavigateToPage(page) {
		this.router.navigate([`page/${page}`]);
		this.onNavigate.emit({ page: `page/${page}` });
	}
}
