import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { AppRouterModule } from './modules/app-router/app-router.module';
import { NavComponent } from './main-components/nav/nav.component';
import { LoginModule } from './modules/login/login.module';
import { RegisterModule } from './modules/register/register.module';
import { EventsModule } from './modules/events/events.module';
import { AdminModule } from './modules/admin/admin.module';
import { NotificationComponent } from './main-components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotificationComponent
  ],
  imports: [
    AppRouterModule,
    BrowserModule,
    SharedModule,
    LoginModule,
    RegisterModule,
    EventsModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
