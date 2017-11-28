import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from '../config/configuration.service';
import { Catalogue } from './models/Catalogue';
import { Discount } from './models/Discount';
import 'rxjs/add/operator/map';
import { Order } from './models/Order';

declare function require(name: string);

@Injectable()
export class ProductCatalogueCacheService {
	private catalogue: Catalogue;

	constructor(private configSvc: ConfigurationService, private http: Http) {
		this.catalogue = new Catalogue();
	}

	public getCatalogue(): Observable<Catalogue> {
		if (this.catalogue.categories) {
			return Observable.of(this.catalogue);
		}

		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http
			.get(this.configSvc.baseUrl('ProductCatalogue'), { headers: headers })
			.map((response) => {
				this.catalogue.categories = response.json();
				return this.catalogue as Catalogue;
			})
			.catch((err) => {
				console.log('Error retrieving product catalogue: ' + err);
				return Observable.of(null);
			});
	}

	public discounts(): Observable<Discount[]> {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http
			.get(this.configSvc.baseUrl('Discounts'), { headers: headers })
			.map((response) => {
				return response.json() as Discount[];
			})
			.catch((err) => {
				console.log('Error retrieving products discounts: ' + err);
				return Observable.of([]);
			});
	}

	public placeOrder(order: Order): Observable<any> {
        const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http
			.post(this.configSvc.baseUrl('Order'), order, { headers: headers })
			.map((response) => {
				return response.json();
			})
			.catch((err) => {
				return Observable.throw(err.json().data);
            });
	}
}
