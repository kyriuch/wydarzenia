import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';
import { User } from '../../../shared/models/user.model';
import * as moment from 'moment';
import { AuthService } from '../../../shared/services/auth.service';
import { NotificationService, NotificationType } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-sign-for-event',
  templateUrl: './sign-for-event.component.html',
  styleUrls: ['./sign-for-event.component.scss']
})
export class SignForEventComponent implements OnInit {

  events: Event[];
  selectedName: string;
  currentEvent: Event;
  currentUsers: User[];
  currentDate: string;
  selectedParticipantType: string;
  selectedFoodType: string;

  constructor(private eventsService: EventsService, private auth: AuthService, private notificationService: NotificationService) { }

  ngOnInit() {
    moment.locale('pl');
    this.eventsService.getEvents().subscribe((data => {
      this.events = data;

      if (this.events.length > 0) {
        this.selectedParticipantType = 'Słuchacz';
        this.selectedFoodType = 'Brak preferencji';
        this.currentEvent = this.events[0];
        this.currentDate = moment(this.currentEvent.date).format('DD/MM/YYYY HH:mm');
        this.updateCurrentUsers(this.currentEvent);
      }
    }));
  }

  updateCurrentEvent(): void {
    this.currentEvent = this.events.find(x => x.eventName === this.selectedName);
    this.currentDate = moment(this.currentEvent.date).format('DD/MM/YYYY HH:mm');
    this.updateCurrentUsers(this.currentEvent);
  }

  updateCurrentUsers(event: Event): void {
    this.eventsService.getEventUsers(event).subscribe((data) => {
      this.currentUsers = data;
    });
  }

  getCurrentUsers(): string {
    if (!this.currentUsers || this.currentUsers.length <= 0) {
      return 'Brak';
    }

    return this.currentUsers.map(x => x.firstName + ' ' + x.lastName).toString().split(',').join(', ');
  }

  submitForm(): void {
    if (!this.events || this.events.length <= 0) {
      return;
    }

    this.eventsService.addParticipant(
      {
        participant: {
          foodType: this.selectedFoodType,
          userId: this.auth.user.value.id,
          isParticipantAccepted: this.auth.user.value.roles.indexOf('Admin') >= 0 ? true : false,
          participationType: this.selectedParticipantType,
          id: 0
        },
        eventId: this.currentEvent.id
      }
    ).subscribe((data) => {
      this.notificationService.showNotification(
        {
          message: 'Pomyślnie zapisano do wydarzenia. Poczekaj teraz na decyzję administratora.',
          type: NotificationType.Success
        }
      );
    }, (err) => this.notificationService.showNotification(
      {
        message: err.error,
        type: NotificationType.Error
      }
    ));
  }
}
