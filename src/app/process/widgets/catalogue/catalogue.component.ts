import { Discount } from './../../../product-catalogue-cache/models/Discount';
import { Product } from './../../../product-catalogue-cache/models/Product';
import { Catalogue } from '../../../product-catalogue-cache/models/Catalogue';
import { Order } from '../../../product-catalogue-cache/models/Order';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WidgetComponent } from '../widget.component';
import { ProductCatalogueCacheService } from '../../../product-catalogue-cache/product-catalogue-cache.service';

@Component({
	selector: 'app-catalogue',
	templateUrl: './catalogue.component.html',
	styleUrls: [ './catalogue.component.css' ]
})
export class CatalogueComponent implements OnInit, WidgetComponent {

	@Output() data: any;
	@Input() onNavigate: EventEmitter<any>;
	catalogue: Catalogue;

	constructor(private productCatalogueSvc: ProductCatalogueCacheService) {}

	ngOnInit() {
		this.productCatalogueSvc.getCatalogue().subscribe((catalogue) => {
			this.catalogue = catalogue;
		});
	}

	order(product: Product) {
		const order = new Order();
		order.products = [];
		order.products.push(product);
		order.deliveryStatus = false;
		order.totalPrice = this.applyDiscount(this.determineTotalPrice(order.products));
	}

	determineTotalPrice(products: Product[]): number {
		let totalPrice = 0;

		products.forEach(product => {
			totalPrice += product.price;
		});

		return totalPrice;
	}

	applyDiscount(amount: number): number {

		let discounts: Discount[] = [];

		this.productCatalogueSvc.discounts().subscribe(disounts => {
			discounts = discounts;
		});

		if (amount >= 50 || amount <= 100) {
			return amount * discounts[0].discountPercentage;
		} else if (amount >= 112 || amount <= 115) {
			return amount * discounts[1].discountPercentage;
		} else if (amount > 120) {
			return amount * discounts[2].discountPercentage;
		}

		return amount;
	}
}
