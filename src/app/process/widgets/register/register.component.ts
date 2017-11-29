import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetComponent } from '../widget.component';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { User } from '../../../authentication/models/User';
import { Person } from '../../../product-catalogue-cache/models/Person';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from '../../../product-catalogue-cache/models/Address';
import { Account } from '../../../product-catalogue-cache/models/Account';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit, WidgetComponent {

	@Output() data: any;
	@Input() onNavigate: EventEmitter<any>;

	registerForm: FormGroup;
	user: User;
	registrationStatus = false;

	constructor(private authenticationSvc: AuthenticationService, fb: FormBuilder, private router: Router) {
		this.user = new User();
		this.user.person = new Person();
		this.user.person.address = new Address();
		this.user.person.bankAccount = new Account();

		this.registerForm = fb.group({
			'idNumber': [null, Validators.required],
			'firstName': [null, Validators.required],
			'lastName': [null, Validators.required],
			'email': [null, Validators.required],
			'phone': [null, Validators.required],
			'accountNumber': [null, Validators.required],
			'bankName': [null, Validators.required],
			'branchCode': [null, Validators.required],
			'complexName': [null, Validators.required],
			'streetName': [null, Validators.required],
			'suburb': [null, Validators.required],
			'city': [null, Validators.required],
			'state': [null, Validators.required],
			'country': [null, Validators.required],
			'postalCode': [null, Validators.required],
			'username': [null, Validators.required],
			'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/[A-Z]/),
				Validators.pattern(/[a-z]/),
				Validators.pattern(/[0-9]/),
				Validators.pattern(/[$@$!%*?&]/)
			])]
		});
	}

	ngOnInit() {}

	public register(formData) {

		if (this.registerForm.valid) {
			const user = new User();
			Object.assign(user, formData);

			this.authenticationSvc.register(user)
				.subscribe(result => {
					if (result.status === '200') {
						this.registrationStatus = true;

						alert('Application successful, you can now login');
						this.onNavigateToPage('login');
					} else if (result.status === '403') {
						this.registrationStatus = false;

						alert('Error: ' + result.data.error);
					}
				});
		} else {
			this.onValidateForm();
		}
	}

	public onValidateForm(): void {

        Object.keys(this.registerForm.controls).map((controlName) => {
            this.registerForm.get(controlName).markAsTouched({ onlySelf: true });
        });
	}

	public onNavigateToPage(page) {
		this.router.navigate([`page/${page}`]);
		this.onNavigate.emit({ page: `page/${page}` });
	}
}
