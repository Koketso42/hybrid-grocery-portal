import { Component, OnInit, Output } from '@angular/core';
import { WidgetData } from '../widgets/widget-data.component';
import { CatalogueComponent } from '../widgets/catalogue/catalogue.component';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LoginComponent } from './../widgets/login/login.component';
import { RegisterComponent } from './../widgets/register/register.component';
import { ProfileComponent } from './../widgets/profile/profile.component';
import { TransactionsComponent } from '../widgets/transactions/transactions.component';

@Component({
	selector: 'app-process-page',
	templateUrl: './process-page.component.html',
	styleUrls: [ './process-page.component.css' ]
})
export class ProcessPageComponent implements OnInit {

  @Output() page: string;

	widgetMap: WidgetData[] = [
		new WidgetData(CatalogueComponent, {}, 'Shopping catalogue', 'shop'),
		new WidgetData(LoginComponent, {}, 'User login', 'login'),
		new WidgetData(RegisterComponent, {}, 'User registration', 'register'),
		new WidgetData(ProfileComponent, {}, 'My profile', 'profile'),
		new WidgetData(TransactionsComponent, {}, 'My transaction', 'transaction')
	];

	activeWidgets: WidgetData[] = [];

	constructor(private route: ActivatedRoute, private router: Router) {
		this.setupActiveWidget();
	}

	ngOnInit() {}

	private setupActiveWidget() {
		const widgets: WidgetData[] = [];

		this.route.params
			.take(1) // take 1 so that the sequence will complete, allowing us to count the number of widgets returned.
			.switchMap((params: Params) => {
				return this.mapArrangementToWidgets(params['id']);
			})
			.filter((item) => (item ? true : false))
			.subscribe(
				(widget) => {
					widgets.push(widget);
				},
				(err) => {
					console.log(err);
				},
				() => {
					this.activeWidgets = widgets;
				}
			);
	}

	mapArrangementToWidgets(key: string): Observable<WidgetData> {
		const widgets: WidgetData[] = this.widgetMap.filter((item: WidgetData) => {
			item.data = { key: key };
			return item.key === key;
		});

		return Observable.from(widgets);
	}

	onNavigate(event) {
    setTimeout(() => {
      this.setupActiveWidget();
    }, 200);
	}
}
