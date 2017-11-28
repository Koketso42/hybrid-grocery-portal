import { User } from './../../../authentication/models/User';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetComponent } from '../widget.component';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { User } from '../../../authentication/models/User';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, WidgetComponent {

	@Output() data: any;
	@Input() onNavigate: EventEmitter<any>;

	loginStatus = false;
	user: User = null;

	username: string;
	password: string;

	constructor(private authenticationSvc: AuthenticationService) {}

	ngOnInit() {}

	public login(username, password) {
		const user = new User();
		user.username = username;
		user.password = password;
		this.authenticationSvc.login(user)
			.subscribe(result => {
				if (result !== null) {
					this.loginStatus = true;
					this.user = result as User;
				}
			});
	}
}
