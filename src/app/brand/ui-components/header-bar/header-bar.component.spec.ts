import { async, ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HeaderBarComponent } from './header-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PersistentStorageService } from '../../../config/persistent-storage.service';

describe('HeaderBarComponent', () => {
	let component: HeaderBarComponent;
	let fixture: ComponentFixture<HeaderBarComponent>;

	const mockRoute = {
		navigate: jasmine.createSpy('navigate')
	};

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [ NgbModule ],
        declarations: [ HeaderBarComponent ],
        providers: [
          { provide: Router, useValue: mockRoute },
          PersistentStorageService
        ]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
  });

  it('should persist data to local storage', fakeAsync(() => {
    spyOn(component, 'onNavigateToPage').and.callThrough();
    component.onNavigateToPage('shop', false);
    tick();
    expect(component.onNavigateToPage).toHaveBeenCalled();
  }));
});
