import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ProcessPageComponent } from './process-page.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component, DebugElement } from '@angular/core';
import { WidgetData } from '../widgets/widget-data.component';
import { CatalogueComponent } from '../widgets/index';
import { ProcessWidgetDirective } from '../widgets/process-widget/process-widget.directive';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

describe('ProcessPageComponent', () => {
	let component: ProcessPageComponent;
	let testWrapper: DebugElement;
	let fixture: ComponentFixture<TestWrapperComponent>;

	const widgetsSpy = jasmine
		.createSpy('activeWidgets')
		.and.returnValues([ new WidgetData(CatalogueComponent, {}, 'Shopping catalogue', 'shop') ]);

	const onNavigateSpy = jasmine.createSpy('onNavigate');

	const mockRoute = {
		navigate: jasmine.createSpy('navigate')
	};

	const mockActivatedRoute = {
		params: Observable.from([ { id: 1 } ]),
		snapshot: {
			data: {
				name: 'shop'
			}
		}
	};

	@Component({
		selector: 'app-test-wrapper',
		template: `<app-process-page (onNavigate)="onNavigate($event)"></app-process-page>`
	})
	class TestWrapperComponent {
		activeWidgets = widgetsSpy;
		onNavigate = onNavigateSpy;
	}

	@Component({
		selector: 'app-header-bar',
		template: `<h1>Header Section</h1>`
	})
	class MockHeaderComponent {}

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [
					ProcessWidgetDirective,
					MockHeaderComponent,
					TestWrapperComponent,
					ProcessPageComponent
				],
				providers: [
					{ provide: ActivatedRoute, useValue: mockActivatedRoute },
					{ provide: Router, useValue: mockRoute }
				],
				schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TestWrapperComponent);
		testWrapper = fixture.debugElement.children[0];
		component = testWrapper.componentInstance;
		fixture.detectChanges();
	});

	it('should create process page component instance', () => {
		expect(component).toBeTruthy();
  });

  it('should navigate to another widget', fakeAsync(() => {
    spyOn(component, 'onNavigate');
    component.onNavigate('shop');
    tick();
    expect(component.onNavigate).toHaveBeenCalled();
  }));
});
