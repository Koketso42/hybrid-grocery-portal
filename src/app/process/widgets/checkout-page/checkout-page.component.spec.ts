import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CheckoutPageComponent } from './checkout-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersistentStorageService } from '../../../config/persistent-storage.service';
import { Router } from '@angular/router';
import { EventEmitter, Component } from '@angular/core';
import { DebugElement } from '@angular/core/src/debug/debug_node';

describe('CheckoutPageComponent', () => {
  let component: CheckoutPageComponent;
  let testWrapper: DebugElement;
  let fixture: ComponentFixture<TestWrapperComponent>;

  const mockRoute = {
		navigate: jasmine.createSpy('navigate')
  };

  @Component({
		selector: 'app-test-wrapper',
		template: `<app-checkout-page></app-checkout-page>`
	})
	class TestWrapperComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ TestWrapperComponent, CheckoutPageComponent ],
      providers: [
        PersistentStorageService,
        { provide: Router, useValue: mockRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    testWrapper = fixture.debugElement.children[0];
    component = testWrapper.componentInstance;
    fixture.detectChanges();

    mockRoute.navigate.calls.reset();
  });

  it('should create checkout page component instance', fakeAsync(() => {
    component.onNavigate = new EventEmitter<any>();
    tick();
    expect(component).toBeTruthy();
  }));
});
