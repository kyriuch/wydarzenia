import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  events: Event[];
  ready: boolean;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.ready = false;

    this.eventsService.getEventsWithParticipants().subscribe(data => {
      this.events = data;
      this.ready = true;
    });
  }

  getAcceptedPeople(index: number): number {
    if (!this.events[index].participants) {
      return 0;
    }

    this.events[index].participants.forEach(x => console.log(x.isParticipantAccepted));

    return this.events[index].participants.filter(x => x.isParticipantAccepted === true).length;
  }

  getRejectedPeople(index: number): number {
    if (!this.events[index].participants) {
      return 0;
    }

    console.log(this.events[index]);

    return this.events[index].participants.filter(x => x.isParticipantAccepted === false).length;
  }
}
