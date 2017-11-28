import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetComponent } from '../widget.component';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { User } from '../../../authentication/models/User';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

	loginForm: FormGroup;

	constructor(private authenticationSvc: AuthenticationService, fb: FormBuilder, private router: Router) {

		this.loginForm = fb.group({
			'username': [null, Validators.required],
			'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/[A-Z]/),
				Validators.pattern(/[a-z]/),
				Validators.pattern(/[0-9]/),
				Validators.pattern(/[$@$!%*?&]/)
			])]
		});
	}

	ngOnInit() {}

	public login(formData) {

		console.log(formData);

		if (this.loginForm.valid) {
			const user = new User();
			user.username = formData.username;
			user.password = formData.password;

			this.authenticationSvc.login(user)
				.subscribe(result => {
					if (result.status === '200') {
						this.loginStatus = true;
						this.user = result.data as User;

						this.onNavigateToPage('shop');
					} else if (result.status === '403') {
						this.loginStatus = false;
						this.user = null;

						alert('Error: ' + result.data.error);
						this.username = '';
						this.password = '';
					}
				});
		} else {
			this.onValidateForm();
		}
	}

	public onValidateForm(): void {

        Object.keys(this.loginForm.controls).map((controlName) => {
            this.loginForm.get(controlName).markAsTouched({ onlySelf: true });
        });
    }

	public onNavigateToPage(page) {
		this.router.navigate([`page/${page}`]);
		this.onNavigate.emit({ page: `page/${page}` });
	}
}
