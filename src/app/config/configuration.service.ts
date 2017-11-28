/**
 * This service will provide cached app-wide configurations
 * These config values may be retrieved from api's/business processes tools etc.
 */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigurationService {

  private urls: Map<string, string> = new Map();

  constructor() {
    this.urls.set('ProductCatalogue', `${environment.baseUrl}/api/catalogue/`);
    this.urls.set('Discounts', `${environment.baseUrl}/api/discounts/`);
    this.urls.set('Login', `${environment.baseUrl}/api/login/`);
    this.urls.set('Register', `${environment.baseUrl}/api/register/`);
    this.urls.set('Order', `${environment.baseUrl}/api/order/`);
    this.urls.set('Purchase', `${environment.baseUrl}/api/purchase/`);
  }

  baseUrl(key: string) {
    return this.urls.get(key);
  }
}
