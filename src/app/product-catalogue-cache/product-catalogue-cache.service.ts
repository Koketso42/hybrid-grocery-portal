import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from '../config/configuration.service';
import { Catalogue } from './models/Catalogue';
import 'rxjs/add/operator/map';

declare function require(name: string);

@Injectable()
export class ProductCatalogueCacheService {

    private serviceUrl: string;
    private catalogue: Catalogue;

    constructor(private configSvc: ConfigurationService, private http: Http) {
      this.serviceUrl = configSvc.baseUrl('ProductCatalogue');
      this.catalogue = new Catalogue();
    }

    getCatalogue(): Observable<any> {
      if (this.catalogue.categories) {
        return Observable.of(this.catalogue);
      }

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http
        .get(this.serviceUrl, { headers: headers })
        .map(response => {
            this.catalogue.categories = response.json();
            console.log('cat: ', this.catalogue);
            return this.catalogue as Catalogue;
        })
        .catch(err => {
            console.log('Error retrieving product catalogue: ' + err);
            return Observable.of({});
        });
    }
}
