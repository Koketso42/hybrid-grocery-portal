import { TestBed, inject } from '@angular/core/testing';
import { ConfigurationService } from './configuration.service';

describe('ConfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurationService]
    });
  });

  it('should create a service', inject([ConfigurationService], (service: ConfigurationService) => {
    expect(service).toBeTruthy();
  }));

  it('should get base product catalogue url', inject([ConfigurationService], (service: ConfigurationService) => {
    expect(service.baseUrl('ProductCatalogue')).toEqual('http://localhost:3000/api/catalogue/');
  }));
});
