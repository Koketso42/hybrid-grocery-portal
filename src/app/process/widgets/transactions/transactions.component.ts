import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../widget.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, WidgetComponent {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
