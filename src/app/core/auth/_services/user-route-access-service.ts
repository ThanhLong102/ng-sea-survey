import {Injectable, isDevMode} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AccountService} from './account.service';
import {AppConfig} from '../../_config/app.page.config';

@Injectable({providedIn: 'root'})
export class UserRouteAccessService implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService,
        private configService: AppConfig
    ) {
    }

    // @ts-ignore
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // We need to call the checkLogin / and so the accountService.identity() function, to ensure,
        // that the client has a principal too, if they already logged in by the server.
        // This could happen on a page refresh.
        // @ts-ignore
        const token = localStorage.getItem(this.configService.getConfig().token);
        if (token) {
            return true;
        }
        this.router.navigate(['auth/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }

    checkLogin(url: string): Observable<boolean> {
        // tslint:disable-next-line:no-debugger
        debugger;

        if (!this.accountService.getToken()) {
            // Kiem tra neu KHONG CO token --> FAIL
            return new Observable<boolean>(ob => {
                this.accountService.logout();
                ob.next(false);
            });
        } else {
            // Kiem tra neu CO token --> Verify token
            return this.accountService.identity().pipe(
                map(account => {
                    if (account) {
                        if (!account.authorities || account.authorities.length === 0) {
                            return false;
                        } else {
                            const hasAnyAuthority = this.accountService.hasAnyAuthority(account.authorities);
                            console.log(hasAnyAuthority);
                            if (hasAnyAuthority) {
                                return true;
                            }
                            if (isDevMode()) {
                                console.error('User has not any of required authorities: ', account.authorities);
                            }
                            return false;
                        }
                    }

                    this.accountService.logout();
                    return false;
                })
            );
        }
    }
}
