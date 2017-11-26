import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponent } from '../widget.component';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit, WidgetComponent {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
