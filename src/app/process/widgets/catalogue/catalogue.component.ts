import { Discount } from './../../../product-catalogue-cache/models/Discount';
import { Product } from './../../../product-catalogue-cache/models/Product';
import { Catalogue } from '../../../product-catalogue-cache/models/Catalogue';
import { Order } from '../../../product-catalogue-cache/models/Order';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WidgetComponent } from '../widget.component';
import { ProductCatalogueCacheService } from '../../../product-catalogue-cache/product-catalogue-cache.service';
import { Router } from '@angular/router';
import { PersistentStorageService } from '../../../config/persistent-storage.service';

@Component({
	selector: 'app-catalogue',
	templateUrl: './catalogue.component.html',
	styleUrls: [ './catalogue.component.css' ]
})
export class CatalogueComponent implements OnInit, WidgetComponent {
	@Output() data: any;
	@Input() onNavigate: EventEmitter<any>;
	catalogue: Catalogue;

	constructor(
		private productCatalogueSvc: ProductCatalogueCacheService,
		private router: Router,
		private persistentStorageSvc: PersistentStorageService
	) {}

	ngOnInit() {
		this.productCatalogueSvc.getCatalogue().subscribe((catalogue) => {
			this.catalogue = catalogue;
		});
	}

	order(product: Product) {
		this.productCatalogueSvc.discounts().subscribe((disountsList) => {
			const order = new Order();
			order.products = [];
			order.products.push(product);
			order.deliveryStatus = false;
			order.totalPrice = this.applyDiscount(disountsList, this.determineTotalPrice(order.products));

			this.productCatalogueSvc.placeOrder(order).subscribe((results) => {
				console.log(results);
				this.persistOrder(results as Order);
				// navigate to checkout page
				this.onNavigateToPage('checkout');
			});
		});
	}

	determineTotalPrice(products: Product[]): number {
		let totalPrice = 0;

		products.forEach((product) => {
			totalPrice += product.price;
		});

		return totalPrice;
	}

	applyDiscount(disountsList: any[], amount: number): number {
		if (amount >= 50 && amount <= 100) {
			return amount * disountsList[0].discountPercentage;
		} else if (amount >= 112 && amount <= 115) {
			return amount * disountsList[1].discountPercentage;
		} else if (amount > 120) {
			return amount * disountsList[2].discountPercentage;
		}

		return amount;
	}

	public onNavigateToPage(page) {
		this.router.navigate([ `page/${page}` ]);
		this.onNavigate.emit({ page: `page/${page}` });
	}

	private persistOrder(orderObj: Order) {
		this.persistentStorageSvc.save('basket.order', orderObj);
	}
}
