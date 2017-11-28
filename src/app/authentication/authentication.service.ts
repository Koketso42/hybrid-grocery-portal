import { User } from './models/User';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from '../config/configuration.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
	constructor(private configSvc: ConfigurationService, private http: Http) {}

	public login(user: User): Observable<any> {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http
			.post(this.configSvc.baseUrl('login'), user, { headers: headers })
			.map((response) => {
				return response.json() as User;
			})
			.catch((err) => {
                Observable.throw(err.json().data);
                return Observable.of(null);
			});
    }

    public register(user: User): Observable<any> {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http
			.post(this.configSvc.baseUrl('register'), user, { headers: headers })
			.map((response) => {
				return response.json() as User;
			})
			.catch((err) => {
                Observable.throw(err.json().data);
                return Observable.of(null);
			});
	}
}