// Angular
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
// RxJS
import {Observable} from 'rxjs';
import {AppConfig} from '../../_config/app.page.config';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public configService: AppConfig) {
    }

    // intercept request and add token
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // @ts-ignore
        const authenticationToken = localStorage.getItem(this.configService.getConfig().token);
        let token = '';

        if (authenticationToken) {
            token = 'Bearer ' + authenticationToken;
        }
        const cookie = 'sk-token=' + token + '; Path=/; HttpOnly';
        request = request.clone({
            setHeaders: {
                Authorization: token,
                'Cookie': cookie,
                'Consumer-Device': 'web'
            }
        });
        return next.handle(request);
    }
}
