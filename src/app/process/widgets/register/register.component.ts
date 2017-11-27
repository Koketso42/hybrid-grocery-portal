import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../widget.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, WidgetComponent {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
