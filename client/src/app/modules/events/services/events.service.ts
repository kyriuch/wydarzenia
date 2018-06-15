import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { User } from '../../shared/models/user.model';
import { NewParticipantDto } from '../dtos/new-participant.dto';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

    return this.http.get<Event[]>(
      'http://localhost:62056/api/event/events',
      {
        headers: httpHeaders
      }
    );
  }

  getEventsWithParticipants(): Observable<Event[]> {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

    return this.http.get<Event[]>(
      'http://localhost:62056/api/event/eventswithparticipants',
      {
        headers: httpHeaders
      }
    );
  }

  getEventUsers(event: Event): Observable<User[]> {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

    return this.http.get<User[]>(
      'http://localhost:62056/api/event/users/' + event.id,
      {
        headers: httpHeaders
      }
    );
  }

  addParticipant(newParticipant: NewParticipantDto): Observable<any> {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

    return this.http.post(
      'http://localhost:62056/api/event/addparticipant',
      newParticipant,
      {
        headers: httpHeaders
      }
    );
  }
}
