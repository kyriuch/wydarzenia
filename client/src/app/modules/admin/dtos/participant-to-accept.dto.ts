import { Participant } from '../../events/models/participant.model';
import { User } from '../../shared/models/user.model';

export interface ParticipantToAcceptDto {
    event: Event;
    participant: Participant;
    user: User;
}
