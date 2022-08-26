// Angular
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
// RxJS
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const lang = localStorage.getItem('language');
    // const authenticationToken = localStorage.getItem(environment.authTokenKey);
     const  authenticationToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3OTc5Nzk2ODAxIiwiYXV0aCI6IlJPTEVfSU5QVVQiLCJzYl9kdCI6ImUyZTBlNmNjNzRlZTliMmQ5NzFlZGYyMWI4Zjc2OGZmMzY5Mjg4OGNlMTlmNjVhYzZlMmI1NmQ1YmFjMDIyOWEwMTlkNDk0ZWU3NjMxNjAxZjRlY2I1NDBmZDMyMzQ1YWJkODk5Yzk2ODAxYWFhOTZlNTJhOGU5ODk1ZjhjMjI1OGVhOGU3NmFmMGY4ZmU2MjRlZTMyMWE2NTgzMjZhMjU0NzJjNTI4NmVhNzkyNThhY2NmYjJhMWViNDY0MzcxZjA1NmY4ODliODQ4MDgxZmE0NGU2ZTdhMzY2YWMxYTc2M2Q1M2JlMTBiODkzZGZkNDU3YmIyNTJkYzcwN2QyZTkyOGZmY2U5NTI0ZmNmYmUwYTNkMDZmNGZmNTUxMTJmOTk3NGM5MTg0YTgwNWI3OWIyNjZkYjljNmFkMDUyOTcwOWJjZDU3M2Y4MWE0YmFiNGQ0Y2FmODQ2MmM5NzgwMThlMmUzMmFiZTA3OTZlNjQ5OWExNDNmY2M1NDA1MGY1ZjZkZjQ5ZjdlNWQ0MzM2Y2JhM2RhNjIzODE4OWNjNjUzZmNmN2I2NTJkNDBiY2EwNWRlMzUxYTBjODRmMDZjYWU1ZDA1YzVlNWE3MDg1NzVkZjQ4ODJkOTI1MzU4YWFmOTVlNTA3NGExYzYzZjc5YzAxNTI1MjE3YzI2YzAzMzgzOGQzNTRhYjg5ODliOGNlNTRmNjA5MDI2NmRkNDM1ZjJiMTg4YmNmYjBkMzkyNGE3NjU4ZDhjNDIwODZjNmJmOWM5YjQxZWE3N2YwZmY3MWMyOTVkYjA5YjZiNTFjODgzYTNjNzc3OWIzZmM3NjczNTZjNTYyYTBiYTExOTg4ZGRlYTU2NTI1MDA1Mjg2YTRjZGMzYzYxZTU2ZGI3MWZlMCIsInNiX2siOiJiZGM0M2E2MDNiOTI2Mjc2IiwiZXhwIjoxNTk0MzEwMzg3fQ.6BS_mICcpBownrc3YzK0Hrs2ee_ybjPn__9d315LGX_vms2rBKUPkusXKYdIoFfnAqxViX4gRhkcMgQMz8g3bg'
    let token = '';


    if (authenticationToken) {
      token = 'Bearer ' + authenticationToken;
    }

      request = request.clone({ headers: request.headers.set('Authorization', token) });
  
      request = request.clone({ headers: request.headers.set('Consumer-Device', 'web') });

    request = request.clone({ headers: request.headers.set('Language', lang) });

    // request = request.clone({
    //   setHeaders: {
    //     'Authorization': token,
    //     'Consumer-Device': 'web',
    //     'Language': lang
    //   }
    // });
    return next.handle(request);
  }

}
