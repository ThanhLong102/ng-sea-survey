import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateSurveyComponent} from './create-survey.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgxSurveyModule} from '../../../../projects/ngx-surveys/src/lib';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';

const routes: Routes = [
  {
    path: '',
    component: CreateSurveyComponent,
    children: [
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: '**', redirectTo: '', pathMatch: 'full'},
    ]
  }
];

@NgModule({
    declarations: [CreateSurveyComponent],
    exports: [
        CreateSurveyComponent
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
        MatSlideToggleModule,
        NgxSurveyModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule
    ]
})
export class CreateSurveyModule {
}
