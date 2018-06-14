import { Participant } from '../models/participant.model';

export interface NewParticipantDto {
    participant: Participant;
    eventId: number;
}
