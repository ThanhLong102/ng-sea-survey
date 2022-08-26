import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Login} from '../_models/login.model';
import {AppConfig} from '../../_config/app.page.config';

@Injectable({providedIn: 'root'})
export class AuthServerProvider {
    constructor(private http: HttpClient, private configService: AppConfig) {
    }

    login(credentials: Login): Observable<void> {
        return this.http
            .post<string>(this.configService.getConfig().api.baseUrl + 'api/public/login', credentials)
            .pipe(map(response => this.authenticateSuccess(response)));
    }

    logout(): Observable<void> {
        return new Observable(observer => {
            // @ts-ignore
            localStorage.removeItem(this.configService.getConfig().token);
            observer.complete();
        });
    }

    private authenticateSuccess(response: any): void {
        const jwt = response.data;
        // tslint:disable-next-line:no-debugger
        debugger;
        // @ts-ignore
        localStorage.setItem(this.configService.getConfig().token, jwt);
    }
}
