import { Catalogue } from '../../../product-catalogue-cache/models/Catalogue';
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
}
