import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GuestGuardService implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.auth.init().pipe(
            map(authUser => {
                if (!authUser) {
                    return true;
                }

                if (authUser.roles.indexOf('Admin') < 0 && authUser.roles.indexOf('User') < 0) {
                    return true;
                }

                this.router.navigateByUrl('/signForEvent');
                return false;
            })
        );
    }
}
