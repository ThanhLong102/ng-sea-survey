import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ManagementSurveyComponent} from './management-survey.component';

const routes: Routes = [
    {
        path: '',
        component: ManagementSurveyComponent,
        children: [
            {path: '', redirectTo: '', pathMatch: 'full'},
            {path: '**', redirectTo: '', pathMatch: 'full'},
        ]
    }
];

@NgModule({
    declarations: [ManagementSurveyComponent],
    exports: [
        ManagementSurveyComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        MatIconModule,
        MatTableModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatButtonModule,
        MatSlideToggleModule
    ]
})
export class ManagementSurveyModule {
}
