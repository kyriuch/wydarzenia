import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NewEventDto } from '../../dtos/new-event.dto';
import { EventsService } from '../../services/events.service';
import { NotificationService, NotificationType } from '../../../shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  selectedDate: moment.Moment;
  newEvent: NewEventDto;

  constructor(private eventsService: EventsService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.selectedDate = moment();
    this.newEvent = {
      agenda: '',
      eventName: '',
      date: new Date()
    };
  }

  getPickedDate(): string {
    return this.selectedDate.format('DD/MM/YYYY HH:mm');
  }

  submitForm() {
    this.newEvent.date = this.selectedDate.toDate();

    this.eventsService.addNewEvent(this.newEvent)
      .subscribe((data) => {
        this.notificationService.showNotification(
          {
            message: 'Pomyślnie dodano wydarzenie.',
            type: NotificationType.Success
          }
        );

        this.newEvent.agenda = '';
        this.newEvent.eventName = '';
      }, (err: HttpErrorResponse) => {
        this.notificationService.showNotification(
          {
            message: err.error,
            type: NotificationType.Error
          }
        );
      });
  }
}
