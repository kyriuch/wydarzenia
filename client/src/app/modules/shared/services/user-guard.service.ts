import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserGuardService implements CanActivate {

    constructor(private auth: AuthService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.auth.init().pipe(
            map(authUser => {
                if (!authUser) {
                    return false;
                }

                if (authUser.roles.indexOf('User') >= 0) {
                    return true;
                }

                return false;
            })
        );
    }
}
