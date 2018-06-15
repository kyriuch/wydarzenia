import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, ObservableInput } from 'rxjs';
import { NewEventDto } from '../dtos/new-event.dto';
import { ParticipantToAcceptDto } from '../dtos/participant-to-accept.dto';

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

  getParticipantsToAccept(): Observable<ParticipantToAcceptDto[]> {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

    return this.http.get<ParticipantToAcceptDto[]>(
      'http://localhost:62056/api/event/participantstoaccept',
      {
        headers: httpHeaders
      });
  }

  acceptParticipant(participant: ParticipantToAcceptDto): Observable<ParticipantToAcceptDto> {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

    return this.http.post<ParticipantToAcceptDto>(
      'http://localhost:62056/api/event/acceptparticipant',
      participant,
      {
        headers: httpHeaders
      }
    );
  }

  rejectParticipant(participant: ParticipantToAcceptDto): Observable<ParticipantToAcceptDto> {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

    return this.http.post<ParticipantToAcceptDto>(
      'http://localhost:62056/api/event/rejectparticipant',
      participant,
      {
        headers: httpHeaders
      }
    );
  }
}
