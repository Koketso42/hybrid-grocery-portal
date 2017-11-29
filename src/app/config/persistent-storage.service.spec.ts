import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
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

  it('should persist data to local storage', fakeAsync(inject([PersistentStorageService], (service: PersistentStorageService) => {
    spyOn(service, 'save').and.callThrough();
    service.save('test', { data: 'test' });
    tick();
    expect(service.save).toHaveBeenCalled();
  })));

  it('should get persisted data from local storage', fakeAsync(inject([PersistentStorageService], (service: PersistentStorageService) => {
    expect(service.get('test')).toEqual({ data: 'test' });
  })));
});
