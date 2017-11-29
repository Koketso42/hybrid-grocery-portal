import { Address } from './../../../product-catalogue-cache/models/Address';
import { WidgetComponent } from './../widget.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PersistentStorageService } from '../../../config/persistent-storage.service';
import { Order } from '../../../product-catalogue-cache/models/Order';
import { Person } from '../../../product-catalogue-cache/models/Person';
import { Account } from '../../../product-catalogue-cache/models/Account';

@Component({
	selector: 'app-checkout-page',
	templateUrl: './checkout-page.component.html',
	styleUrls: [ './checkout-page.component.scss' ]
})
export class CheckoutPageComponent implements OnInit, WidgetComponent {
	@Output() data: any;
	@Input() onNavigate: EventEmitter<any>;

	visiblePanel = 'address';
	counter = 1;

	order: Order;
	addressForm: FormGroup;

	constructor(private persistentStorageSvc: PersistentStorageService, fb: FormBuilder) {
		this.addressForm = fb.group({
			complexName: [ null, Validators.required ],
			streetName: [ null, Validators.required ],
			suburb: [ null, Validators.required ],
			city: [ null, Validators.required ],
			state: [ null, Validators.required ],
			country: [ null, Validators.required ],
			postalCode: [ null, Validators.required ]
		});
		this.order = persistentStorageSvc.get('basket.order') as Order || new Order();

		if (this.order.customer == null) {
			this.order.customer = new Person();
			this.order.customer.address = new Address();
			this.order.customer.bankAccount = new Account();
		}
	}

	ngOnInit() {}

	public confirmAddress(formData) {
		if (this.addressForm.valid) {
			const address = new Address();
			Object.assign(address, formData);
			this.order.customer.address = address;
			this.visiblePanel = 'confirm';
			++this.counter;
		} else {
			this.onValidateForm(this.addressForm);
		}
	}

	public onValidateForm(formControls: any): void {
		Object.keys(formControls.controls).map((controlName) => {
			formControls.get(controlName).markAsTouched({ onlySelf: true });
		});
	}

	public confirmOrder(event) {
		this.visiblePanel = 'payment';
		++this.counter;
	}

	public confirmPayment(event) {
		this.visiblePanel = 'finish';
		++this.counter;
	}

	public finish(event) {}
}
