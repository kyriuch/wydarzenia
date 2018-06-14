import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService, NotificationType } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

    constructor(private auth: AuthService, private notificationService: NotificationService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.auth.init().pipe(
            map(authUser => {
                if (!authUser) {
                    this.sendNotification();
                    this.router.navigateByUrl('/login');
                    return false;
                }

                if (authUser.roles.indexOf('Admin') >= 0) {
                    return true;
                }

                this.sendNotification();
                this.router.navigateByUrl('/signForEvent');
                return false;
            })
        );
    }

    sendNotification(): void {
        this.notificationService.showNotification(
            {
                message: 'Nie masz uprawnień administratora.',
                type: NotificationType.Error
            }
        );
    }
}
