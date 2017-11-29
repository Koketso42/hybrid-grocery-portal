import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserSession } from '../../../authentication/models/UserSession';
import { PersistentStorageService } from '../../../config/persistent-storage.service';

@Component({
	selector: 'app-header-bar',
	templateUrl: './header-bar.component.html',
	styleUrls: [ './header-bar.component.css' ]
})
export class HeaderBarComponent implements OnInit {

	@Output() onNavigate: EventEmitter<any> = new EventEmitter();
	userSession: UserSession = null;
	logout: boolean;

	constructor(private router: Router, private persistentStorageSvc: PersistentStorageService) {
		this.userSession = this.persistentStorageSvc.get('SESSION.userSession') as UserSession;
		if (this.userSession.authenticated) {
			this.logout = false;
		} else {
			this.logout = true;
		}
	}

	ngOnInit() {}

	onNavigateToPage(page, logout?: boolean) {
		this.userSession = this.persistentStorageSvc.get('SESSION.userSession') as UserSession;

		if (page === 'shop' && (!logout || this.userSession.authenticated)) {
			this.userSession.authenticated = logout;
			this.userSession.user = null;
			this.persistentStorageSvc.save('SESSION.userSession', this.userSession);
		}

		this.router.navigate([`page/${page}`]);
		this.onNavigate.emit({ page: `page/${page}` });
	}
}
