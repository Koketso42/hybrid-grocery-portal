import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { CatalogueComponent } from './catalogue.component';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ProductCatalogueCacheService } from '../../../product-catalogue-cache/product-catalogue-cache.service';
import { PersistentStorageService } from '../../../config/persistent-storage.service';
import { Component, DebugElement, EventEmitter } from '@angular/core';

describe('CatalogueComponent', () => {
	let component: CatalogueComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;
  let testWrapper: DebugElement;

  const mockRoute = {
		navigate: jasmine.createSpy('navigate')
	};

	const productCatalogueCacheServiceMock = {
		getCatalogue: jasmine
			.createSpy('getCatalogue')
			.and.returnValue(
				Observable.of([
					{
						'categoryId': 1,
						'categoryName': 'Printing',
						'products': [
							{
								'productId': 1,
								'productName': 'SAMSUNG Black Laser Toner Cartridge',
								'shortDescription': 'Laser printer, YWellow, Clt-y404s',
								'price': 300,
								'quantity': 10,
								'imageURL': ''
							},
							{
								'productId': 2,
								'productName': 'CANON - Cl-513 Inkjet Cartridge',
								'shortDescription':
									'Cl-512 colour high yield cartridge, For use in mp250 mx320, 12 month guarantee',
								'price': 80,
								'quantity': 25,
								'imageURL': ''
							}
						]
					}
				])
			)
  };

  @Component({
		selector: 'app-test-wrapper',
		template: `<app-catalogue></app-catalogue>`
	})
	class TestWrapperComponent {}

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
        imports: [],
        declarations: [ TestWrapperComponent, CatalogueComponent ],
        providers: [
          { provide: Router, useValue: mockRoute },
          { provide: ProductCatalogueCacheService, useValue: productCatalogueCacheServiceMock },
          PersistentStorageService
        ]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TestWrapperComponent);
    testWrapper = fixture.debugElement.children[0];
    component = testWrapper.componentInstance;
    fixture.detectChanges();

    mockRoute.navigate.calls.reset();
	});

	it('should create shopping component instance', () => {
		expect(component).toBeTruthy();
  });

  describe('when the user checkout', () => {
    it('should direct to the checkout page', fakeAsync(() => {
      component.onNavigate = new EventEmitter<any>();
      spyOn(component, 'onNavigateToPage').and.callThrough();
      component.onNavigateToPage('checkout');
      tick();
      expect(component.onNavigateToPage).toHaveBeenCalledWith('checkout');
    }));
  });
});
