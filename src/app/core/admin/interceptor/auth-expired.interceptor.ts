import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

// import {AccountService} from '../_services/account.service';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
    constructor(
        // private accountService: AccountService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(null, (err: HttpErrorResponse) => {
                if (err.status === 401 && err.url && !err.url.includes('api/ldap-account-info')) {
                    // this.accountService.logout();
                }
            })
        );
    }
}
