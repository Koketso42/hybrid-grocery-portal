import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../widget.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, WidgetComponent {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
