import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignForEventComponent } from './components/sign-for-event/sign-for-event.component';
import { SharedModule } from '../shared/shared.module';
import { EventsComponent } from './components/events/events.component';
import { PeopleComponent } from './components/people/people.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [SignForEventComponent, EventsComponent, PeopleComponent]
})
export class EventsModule { }
