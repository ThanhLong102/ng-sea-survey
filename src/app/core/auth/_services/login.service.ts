import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {AccountService} from './account.service';
import {AuthServerProvider} from './auth-jwt.service';
import {Login} from '../_models/login.model';

@Injectable({providedIn: 'root'})
export class LoginService {
    constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) {
    }

    login(credentials: Login): Observable<any | null> {
        return this.authServerProvider.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
    }

    logout(): void {
        // @ts-ignore
        this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
    }
}
