import { Component, OnInit } from '@angular/core';
import { ParticipantToAcceptDto } from '../../dtos/participant-to-accept.dto';
import { EventsService } from '../../services/events.service';
import { NotificationService, NotificationType } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-signs',
  templateUrl: './signs.component.html',
  styleUrls: ['./signs.component.scss']
})
export class SignsComponent implements OnInit {

  participantsToAccept: ParticipantToAcceptDto[];

  constructor(private eventsService: EventsService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.eventsService.getParticipantsToAccept().subscribe(data => {
      this.participantsToAccept = data;
      console.log(data);
    });
  }

  acceptUser(participant: ParticipantToAcceptDto) {
    this.eventsService.acceptParticipant(participant).subscribe(data => {
      if (data.participant.id === participant.participant.id) {
        console.log(data);
        console.log(participant);
        this.participantsToAccept.splice(this.participantsToAccept.indexOf(data), 1);
      }
    }, err => {
      this.notificationService.showNotification(
        {
          message: err.error,
          type: NotificationType.Error
        }
      );
    });
  }
}
