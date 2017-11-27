import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from '../config/configuration.service';
import { Catalogue } from './models/Catalogue';

declare function require(name: string);

@Injectable()
export class ProductCatalogueCacheService {

    private serviceUrl: string;
    private catalogue: Catalogue;

    constructor(private configSvc: ConfigurationService, private http: Http) {
      this.serviceUrl = configSvc.baseUrl('ProductCatalogue');
    }

    getCatalogue(): Observable<any> {
      if (this.catalogue) {
        return Observable.of(this.catalogue);
      }

      return this.http
        .get(this.serviceUrl)
        .map(response => {
            this.catalogue = response.json() as Catalogue;
            return this.catalogue;
        })
        .catch(err => {
            console.log('Error retrieving product catalogue: ' + err);
            return Observable.of({});
        });
    }
}
