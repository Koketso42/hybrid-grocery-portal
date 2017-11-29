import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
describe('AppComponent', () => {
	@Component({
		selector: 'app-test-wrapper',
		template: `<app-root></app-root>`
	})
	class TestWrapperComponent {
		title = 'app';
	}

	@Component({
		selector: 'router-outlet',
		template: `<h1>router</h1>`
	})
	class MockRouterOutletComponent {}

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ MockRouterOutletComponent, TestWrapperComponent, AppComponent ]
			}).compileComponents();
		})
	);
	it(
		'should create the app',
		async(() => {
			const fixture = TestBed.createComponent(AppComponent);
			const app = fixture.debugElement.componentInstance;
			expect(app).toBeTruthy();
		})
	);
});
