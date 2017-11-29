import { TestBed, inject } from '@angular/core/testing';
import { PersistentStorageService } from './persistent-storage.service';

describe('PersistentStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersistentStorageService]
    });
  });

  it('should create PersistentStorageService a service', inject([PersistentStorageService], (service: PersistentStorageService) => {
    expect(service).toBeTruthy();
  }));
});
