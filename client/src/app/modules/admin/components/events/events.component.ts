import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NewEventDto } from '../../dtos/new-event.dto';
import { EventsService } from '../../services/events.service';
import { NotificationService, NotificationType } from '../../../shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Event } from '../../../events/models/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  selectedDate: moment.Moment;
  newEvent: NewEventDto;
  events: Event[];
  currentEditedEvent: Event;

  constructor(private eventsService: EventsService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.eventsService.getEvents().subscribe(data => {
      this.events = data;
    });

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

  submitForm(): void {
    this.newEvent.date = this.selectedDate.toDate();

    this.eventsService.addNewEvent(this.newEvent)
      .subscribe((data) => {
        this.notificationService.showNotification(
          {
            message: 'Pomyślnie dodano wydarzenie.',
            type: NotificationType.Success
          }
        );

        this.events.push(data);

        this.newEvent = {
          agenda: '',
          date: new Date(),
          eventName: ''
        };

        this.selectedDate = moment(this.newEvent.date);
      }, (err: HttpErrorResponse) => {
        this.notificationService.showNotification(
          {
            message: err.error,
            type: NotificationType.Error
          }
        );
      });
  }

  updateEvent(): void {
    this.eventsService.patchEvent(
      {
        id: this.currentEditedEvent.id,
        agenda: this.newEvent.agenda,
        date: this.newEvent.date,
        eventName: this.newEvent.eventName,
        participants: null
      }
    ).subscribe(data => {
      const foundEvent = this.events.find(x => x.id === data.id);
      this.events[this.events.indexOf(foundEvent)] = data;

      this.currentEditedEvent = null;
      this.notificationService.showNotification(
        {
          message: 'Pomyślnie zaktualizowano wydarzenie.',
          type: NotificationType.Success
        }
      );
    }, (err) => this.notificationService.showNotification(
      {
        message: 'Coś poszło nie tak.',
        type: NotificationType.Error
      }
    ));
  }

  selectRow(event: Event): void {
    this.currentEditedEvent = event;
    this.newEvent.agenda = event.agenda;
    this.newEvent.eventName = event.eventName;
    this.newEvent.date = event.date;
    this.selectedDate = moment(this.newEvent.date);
  }

  cancel(): void {
    this.newEvent = {
      agenda: '',
      date: new Date(),
      eventName: ''
    };

    this.notificationService.showNotification(
      {
        message: 'Anulowano edycje wydarzenia.',
        type: NotificationType.Warning
      }
    );

    this.selectedDate = moment(this.newEvent.date);

    this.currentEditedEvent = null;
  }
}
