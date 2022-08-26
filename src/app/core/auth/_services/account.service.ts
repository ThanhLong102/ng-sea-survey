import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, of, ReplaySubject} from 'rxjs';
import {Account} from '../_models/account.model';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import {AppConfig} from '../../_config/app.page.config';
import {MatDialog} from '@angular/material/dialog';

@Injectable({providedIn: 'root'})
export class AccountService {
    private userIdentity: Account;
    private authenticationState = new ReplaySubject<Account | null>(1);
    private accountCache$?: Observable<Account | null>;

    constructor(
        private http: HttpClient,
        private router: Router,
        public configService: AppConfig,
        public dialogRef: MatDialog
    ) {
    }

    authenticate(identity: Account): void {
        this.userIdentity = identity;
        this.authenticationState.next(this.userIdentity);
        if (identity) {
            console.log('TODO: connect');
        } else {
            console.log('TODO: disconnect');
        }
    }

    hasAnyAuthority(authorities: string[] | string): boolean {
        if (!this.userIdentity || !this.userIdentity.authorities) {
            return false;
        }
        if (!Array.isArray(authorities)) {
            authorities = [authorities];
        }
        return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
    }

    identity(force?: boolean): Observable<Account | null> {
        if (!this.accountCache$ || force || !this.isAuthenticated()) {
            this.accountCache$ = this.fetch().pipe(
                catchError(() => {
                    return of(null);
                }),
                tap((account: Account) => {
                    this.authenticate(account);

                    // After retrieve the account info, the language will be changed to
                    // the user's preferred language configured in the account setting
                    /*TODO thay doi ngon ngu theo userlogin*/
                    /*if (account && account.langKey) {
                      const langKey = this.sessionStorage.retrieve('locale') || account.langKey;
                      this.languageService.changeLanguage(langKey);
                    }*/

                    if (account) {
                        this.router.navigate(['home']);
                        /*this.navigateToStoredUrl();*/
                    }
                }),
                shareReplay()
            );
        }
        return this.accountCache$;
    }

    isAuthenticated(): boolean {
        return this.userIdentity !== null;
    }

    getAuthenticationState(): Observable<Account | null> {
        return this.authenticationState.asObservable();
    }
    getToken(): string {
        // @ts-ignore
        return localStorage.getItem(this.configService.getConfig().token);
    }

    private fetch(): Observable<Account> {
        return this.http.get<Account>(this.configService.getConfig().api.baseUrl + 'api/ldap-account-info');
    }

    getUser(): Account {
        return this.userIdentity;
    }

    logout(): void {
        localStorage.clear();
        this.router.navigate(['auth/login']);
        this.dialogRef.closeAll();
    }
}
