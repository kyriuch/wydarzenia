import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from './services/notification.service';

const sharedModules = [
  HttpClientModule,
  FormsModule,
  RouterModule,
  CommonModule
];

@NgModule({
  imports: sharedModules,
  exports: sharedModules,
  declarations: [],
  providers: [
    AuthService,
    NotificationService
  ]
})
export class SharedModule { }
