import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewEventDto } from '../dtos/new-event.dto';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  addNewEvent(newEvent: NewEventDto): Observable<any> {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

    return this.http.post(
      'http://localhost:62056/api/event/add',
      newEvent,
      {
        headers: httpHeaders
      });
  }
}
