import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxSurveyModule} from '../../projects/ngx-surveys/src/lib';

import {AppComponent} from './app.component';
import {DemoComponent} from './demo/demo.component';
import {FooterComponent} from './footer/footer.component';
import {GithubLinkComponent} from './github-link/github-link.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {PageModule} from './views/page.module';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './views/auth/auth.module';
import {AppConfig} from './core/_config/app.page.config';
import {AuthInterceptor} from './core/admin/interceptor/auth.interceptor';
import {AuthExpiredInterceptor} from './core/admin/interceptor/auth-expired.interceptor';

export function initializePageConfig(pageConfig: AppConfig) {
    return () => pageConfig.load();
}

@NgModule({
    declarations: [
        AppComponent,
        DemoComponent,
        FooterComponent,
        GithubLinkComponent,
    ],
    imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, NgxSurveyModule, LayoutModule, MatToolbarModule, MatButtonModule,
        MatSidenavModule, MatIconModule, MatListModule, MatTabsModule, HttpClientModule, RouterModule, PageModule, AuthModule],
    providers: [AppConfig,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: LoaderInterceptor,
        //     multi: true
        // },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initializePageConfig,
            deps: [AppConfig], multi: true
        },

    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
