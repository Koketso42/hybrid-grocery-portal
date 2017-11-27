import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../widget.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, WidgetComponent {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
