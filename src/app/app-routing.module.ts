// Angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {UserRouteAccessService} from './core/auth/_services/user-route-access-service';

const routes: Routes = [
    {path: 'auth', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)},
    {
        path: '',
        component: HomeComponent,
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'create-survey',
                loadChildren: () => import('./views/create-survey/create-survey.module')
                    .then(m => m.CreateSurveyModule),
            },
            {
                path: 'management-survey',
                loadChildren: () => import('./views/management-survey/management-survey.module')
                    .then(m => m.ManagementSurveyModule),
            },
            {
                path: 'report-survey',
                loadChildren: () => import('./views/report-survey/report-survey.module')
                    .then(m => m.ReportSurveyModule),
            },
            {path: '', redirectTo: 'create-survey', pathMatch: 'full'},
            {path: '**', redirectTo: 'create-survey', pathMatch: 'full'},
        ],
    },
    {path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
