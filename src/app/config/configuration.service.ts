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
    this.urls.set('ProductCatalogue', `${environment.baseUrl}/api/catalogue`);
  }

  baseUrl(key: string) {
    return this.urls.get(key);
  }
}
