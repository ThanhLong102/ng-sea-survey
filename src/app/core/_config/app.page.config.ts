import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {CompilerOptions, Injectable, NgModuleRef, Type} from '@angular/core';
import {PageConfig} from './page.config.mode';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {environment} from '../../../environments/environment';
import {throwError} from 'rxjs';

@Injectable()
export class AppConfig {
    settings: PageConfig = new PageConfig();
    env: any;

    constructor(private http: HttpClient) {
    }

    static bootstrap<TM>(moduleType: Type<TM>, compilerOptions?: CompilerOptions | CompilerOptions[]): Promise<NgModuleRef<TM>> {
        return platformBrowserDynamic().bootstrapModule(moduleType, compilerOptions);
    }

    load() {
        return new Promise((resolve) => {
            const options = {
                headers: {Accept: 'application/json', 'Content-Type': 'application/json', DataType: 'application/json'}
            };
            this.env = {
                env: environment
            };
            this.http.get(`./assets/config/${environment.env}.json`, options)
                .subscribe((data: any) => {
                    this.setConfig(data);
                    resolve(true);
                }, (err) => this.errorHandler(err));
        });
    }

    private setConfig = (data: any): void => {
        this.settings.api = data.api;
        this.settings.pageSizeOptions = data.pageSizeOptions;
        this.settings.pageIndex = data.pageIndex;
        this.settings.pageSize = data.pageSize;
        this.settings.token = data.authTokenKey;
    }

    private errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'Server Error');
    }

    getConfig = () => {
        return this.settings;
    }
    getMenu = () => {
        return 'menuList';
    }
}
