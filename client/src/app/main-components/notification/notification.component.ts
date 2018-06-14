import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification, NotificationType } from '../../modules/shared/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationServicie: NotificationService) { }

  notification: Notification;
  notificationClass: string;

  ngOnInit() {
    this.notification = this.notificationServicie.notification.value;
    this.updateNotificationClass();

    this.notificationServicie.notification.subscribe((notification) => {
      this.notification = notification;
      this.updateNotificationClass();
    });
  }

  updateNotificationClass() {
    if (!this.notification.message) {
      this.notificationClass = null;
    }

    switch (this.notification.type) {
      case NotificationType.Error: this.notificationClass = 'is-danger'; break;
      case NotificationType.Success: this.notificationClass = 'is-success'; break;
      case NotificationType.Warning: this.notificationClass = 'is-warning'; break;
      case NotificationType.Info: this.notificationClass = 'is-info'; break;
    }
  }

}
