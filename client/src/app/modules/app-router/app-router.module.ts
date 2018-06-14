import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '../login/components/login-form/login-form.component';
import { RegisterFormComponent } from '../register/components/register-form/register-form.component';
import { UserGuardService } from '../shared/services/user-guard.service';
import { GuestGuardService } from '../shared/services/guest-gaurd.service';
import { SignForEventComponent } from '../events/components/sign-for-event/sign-for-event.component';
import { AdminPanelComponent } from '../admin/components/admin-panel/admin-panel.component';
import { AdminGuardService } from '../shared/services/admin-guard.service';
import { UsersComponent } from '../admin/components/users/users.component';
import { EventsComponent as AdminEventsComponent } from '../admin/components/events/events.component';
import { EventsComponent } from '../events/components/events/events.component';
import { SignsComponent } from '../admin/components/signs/signs.component';
import { PeopleComponent } from '../events/components/people/people.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [GuestGuardService]
  },
  {
    path: 'register',
    component: RegisterFormComponent,
    canActivate: [GuestGuardService]
  },
  {
    path: 'signForEvent',
    component: SignForEventComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [PeopleComponent]
  },
  {
    path: 'adminPanel',
    component: AdminPanelComponent,
    canActivate: [AdminGuardService],
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'events',
        component: AdminEventsComponent
      },
      {
        path: 'signs',
        component: SignsComponent
      },
      {
        path: '**',
        redirectTo: 'users'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'signForEvent'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRouterModule { }
