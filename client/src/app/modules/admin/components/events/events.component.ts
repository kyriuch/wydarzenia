import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  selectedDate: moment.Moment;

  constructor() { }

  ngOnInit() {
    this.selectedDate = moment();
  }

  getPickedDate(): string {
    return this.selectedDate.format('DD/MM/YYYY HH:mm');
  }
}
