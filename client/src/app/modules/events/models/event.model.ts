import { Participant } from './participant.model';


export interface Event {
    id: number;
    eventName: string;
    agenda: string;
    date: Date;
    participants: Participant[];
}
