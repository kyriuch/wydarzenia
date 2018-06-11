import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UsersComponent } from './components/users/users.component';
import { EventsComponent } from './components/events/events.component';
import { SignsComponent } from './components/signs/signs.component';
import { SharedModule } from '../shared/shared.module';
import { UsersService } from './services/users.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [AdminPanelComponent, UsersComponent, EventsComponent, SignsComponent],
  providers: [UsersService]
})
export class AdminModule { }
