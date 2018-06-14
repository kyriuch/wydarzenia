import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService, NotificationType } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class UserGuardService implements CanActivate {

    constructor(private auth: AuthService, private router: Router, private notificationService: NotificationService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.auth.init().pipe(
            map(authUser => {
                if (!authUser) {
                    this.notificationService.showNotification(
                        {
                            message: 'Musisz być zalogowany.',
                            type: NotificationType.Error
                        }
                    );

                    this.router.navigateByUrl('login');

                    return false;
                }

                if (authUser.roles.indexOf('User') >= 0) {
                    return true;
                }

                this.notificationService.showNotification(
                    {
                        message: 'Musisz być użytkownikiem.',
                        type: NotificationType.Error
                    }
                );

                this.router.navigateByUrl('');

                return false;
            })
        );
    }
}
