import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { NgbModule, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { Http, HttpModule, ConnectionBackend, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Router } from '@angular/router';
import { PersistentStorageService } from '../../../config/persistent-storage.service';

declare function require(name: string);
const mockResponse = require('./test-utils/mockResponse.json');

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let authenticationServiceSvc: AuthenticationService;

	let mockBackend: MockBackend;
	let mockConnection: MockConnection;

	const mockConfigurationService = {
		baseUrl: jasmine.createSpy('baseUrl').and.returnValue('https://localhost:3000/catalogue/')
	};

	const mockRoute = {
		navigate: jasmine.createSpy('navigate')
	};

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [ NgbModule, FormsModule, ReactiveFormsModule, HttpModule ],
				declarations: [ LoginComponent ],
				providers: [
					Http,
					AuthenticationService,
					{ provide: ConfigurationService, useValue: mockConfigurationService },
					{ provide: ConnectionBackend, useClass: MockBackend },
					{ provide: Router, useValue: mockRoute },
					PersistentStorageService,
					NgbAccordionConfig
				]
			}).compileComponents();
		})
	);

	beforeEach(
		inject(
			[ AuthenticationService, ConnectionBackend ],
			(service: AuthenticationService, connectionBackend: ConnectionBackend) => {
				fixture = TestBed.createComponent(LoginComponent);
				component = fixture.componentInstance;
				fixture.detectChanges();

				authenticationServiceSvc = service;
				mockBackend = connectionBackend as MockBackend;
			}
		)
	);

	beforeEach(
		fakeAsync(
			inject(
				[ AuthenticationService, ConnectionBackend ],
				(service: AuthenticationService, connectionBackend: ConnectionBackend) => {
					mockBackend.connections.subscribe((connection: MockConnection) => {
						mockConnection = connection;
						connection.mockRespond(
							new Response(
								new ResponseOptions({
									body: JSON.stringify(mockResponse)
								})
							)
						);
					});
				}
			)
		)
	);

	it('should create login component instance', () => {
		expect(component).toBeTruthy();
	});
});
