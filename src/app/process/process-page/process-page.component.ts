import { Component, OnInit } from '@angular/core';
import { WidgetData } from '../widgets/widget-data.component';
import { CatalogueComponent } from '../widgets/catalogue/catalogue.component';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-process-page',
  templateUrl: './process-page.component.html',
  styleUrls: ['./process-page.component.css']
})
export class ProcessPageComponent implements OnInit {

  widgetMap: WidgetData[] = [
    new WidgetData(CatalogueComponent, { }, 'Shopping catalogue', 'shop')
  ];

  private activeWidgets: WidgetData[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router) {

      const widgets: WidgetData[] = [];

      this.route.params
      .take(1) // take 1 so that the sequence will complete, allowing us to count the number of widgets returned.
      .switchMap((params: Params) => {
        return this.mapArrangementToWidgets(params['id']);
      })
      .filter(item => item ? true : false)
      .subscribe(widget => {
        widgets.push(widget);
      }, (err) => {
        console.log(err);
      }, () => {
        this.activeWidgets = widgets;
      });
  }

  ngOnInit() { }

  mapArrangementToWidgets(key: string): Observable<WidgetData> {

    const widgets: WidgetData[] = this.widgetMap.filter((item: WidgetData) => {
        item.data = { key: key };
        return item.key === key;
    });

    return Observable.from(widgets);
  }
}
