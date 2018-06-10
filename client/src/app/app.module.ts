import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { AppRouterModule } from './modules/app-router/app-router.module';
import { NavComponent } from './main-components/nav/nav.component';
import { LoginModule } from './modules/login/login.module';
import { RegisterModule } from './modules/register/register.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    AppRouterModule,
    BrowserModule,
    SharedModule,
    LoginModule,
    RegisterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
