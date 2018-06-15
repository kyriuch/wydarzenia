import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';
import { DatePipe } from '@angular/common';
import { PeopleComponent } from '../people/people.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [DatePipe]
})
export class EventsComponent implements OnInit {

  events: Event[];

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEventsWithParticipants().subscribe((data) => {
      this.events = data;
    });
  }

  getParticipants(event: Event, type: string): number {
    if (!event.participants || event.participants.length <= 0) {
      return 0;
    }

    const filteredParticipants = event.participants.filter(x => x.isParticipantAccepted && x.participationType === type);

    if (filteredParticipants.length <= 0) {
      return 0;
    }

    return filteredParticipants.length;
  }

}
