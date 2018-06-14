import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, interval } from 'rxjs';

export enum NotificationType {
  Success,
  Error,
  Warning,
  Info
}

export interface Notification {
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notification: BehaviorSubject<Notification>;
  subscription: Subscription;

  constructor() {
    this.notification = new BehaviorSubject<Notification>(
      {
        message: null,
        type: 1
      });
  }

  showNotification(notification: Notification): void {
    this.notification.next(notification);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = interval(3000).subscribe(() => {
      this.notification.next({
        message: null,
        type: NotificationType.Error
      });

      this.subscription.unsubscribe();
    });
  }
}
