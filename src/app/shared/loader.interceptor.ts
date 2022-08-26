// import {Injectable} from '@angular/core';
// import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
// import {Observable, throwError} from 'rxjs';
// import {LoaderService} from './loading.service';
// import {Router} from '@angular/router';
// import {catchError, finalize, retry} from 'rxjs/operators';
// import {DialogLoginComponent} from '../views/pages/auth/dialog-login/dialog-login.component';
// import {MatDialog} from '@angular/material/dialog';
// import {DialogLockLoginComponent} from '../views/pages/auth/dialog-lock-login/dialog-lock-login.component';
// import {Constants} from '../utils/constants.class';
// import {NgxSpinnerService} from 'ngx-spinner';
// import {AppConfig} from '../core/_config/app.page.config';
//
// @Injectable()
// export class LoaderInterceptor implements HttpInterceptor {
//     token = this.configService.getConfig().token;
//     private totalRequests: HttpRequest<any>[] = [];
//
//     constructor(private router: Router,
//                 private spinnerService: NgxSpinnerService,
//                 private loaderService: LoaderService,
//                 public dialog: MatDialog,
//                 public configService: AppConfig,
//                 public dialogRef: MatDialog
//     ) {
//     }
//
//     intercept(
//         req: HttpRequest<any>,
//         next: HttpHandler
//     ): Observable<HttpEvent<any>> {
//         this.totalRequests.push(req);
//         this.loaderService.show();
//         this.spinnerService.show();
//         return next.handle(req).pipe(
//             retry(0),
//
//             catchError((error: HttpErrorResponse) => {
//                     if (error.status === 401) {
//                         this.dialogRef.closeAll();
//                         if (this.getToken()) {
//                             this.openDialog(401);
//                         }
//                         // @ts-ignore
//                         localStorage.removeItem(this.configService.getConfig().token);
//                         const url = this.router.routerState.snapshot.url;
//                         this.router.navigate(['/auth/login'], {queryParams: {returnUrl: url}});
//                         return throwError(error);
//                     } else if (error.status === 403) {
//                         if (this.getToken()) {
//                             this.openDialog(403);
//                         }
//                         return throwError(error);
//                     } else if (error.status === 423) {
//                         this.openDialogLock();
//                         return throwError(error);
//                     } else if (error.status === 500 && this.totalRequests.length === 0) {
//                         if (this.getToken()) {
//                             this.openDialog();
//                         }
//                         return throwError(error);
//                     }
//                     return throwError(error);
//                 }
//             ),
//             finalize(() => {
//                 this.totalRequests.length--;
//                 if (this.totalRequests.length === 0) {
//                     this.spinnerService.hide();
//                     this.loaderService.hide();
//                 }
//             })
//         );
//     }
//
//     openDialogLock() {
//         return this.dialog.open(DialogLockLoginComponent, {
//             width: '500px'
//         });
//     }
//
//     openDialog(status?: number) {
//         const title = Constants.MESSAGE_TITLE_1;
//         let description;
//         if (status === 401) {
//             description = Constants.MESSAGE_ERROR_3;
//         } else if (status === 403) {
//             description = Constants.MESSAGE_ERROR_7;
//         } else {
//             description = Constants.MESSAGE_ERROR_4;
//         }
//         return this.dialog.open(DialogLoginComponent, {
//             data: {title, description},
//             width: '320px'
//         });
//     }
//
//     private getToken() {
//         // @ts-ignore
//         const token = localStorage.getItem(this.configService.getConfig().token);
//         return token;
//     }
// }
