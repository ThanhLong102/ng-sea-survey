import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxSurveyModule} from '../../../projects/ngx-surveys/src/lib';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CreateSurveyModule} from './create-survey/create-survey.module';
import {ManagementSurveyModule} from './management-survey/management-survey.module';
import {ReportSurveyModule} from './report-survey/report-survey.module';


@NgModule({
  declarations: [
      HomeComponent,
      HeaderComponent
  ],
    exports: [
        HomeComponent,
        HeaderComponent
    ],
  providers: [
  ],
  imports: [
      BrowserModule, BrowserAnimationsModule, NgxSurveyModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule,
      MatIconModule, MatListModule, MatTabsModule, HttpClientModule, RouterModule, CreateSurveyModule, ManagementSurveyModule,
      ReportSurveyModule
  ]
})
export class PageModule {
}
