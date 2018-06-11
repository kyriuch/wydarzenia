import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignForEventComponent } from './components/sign-for-event/sign-for-event.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [SignForEventComponent]
})
export class EventsModule { }
