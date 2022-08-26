import {Component, Inject, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgxSurveyComponent} from '../../ngx-survey.component';
import {buildField, FormItem, FormSection} from '../../form-item';
import * as _ from 'lodash';

export interface DialogSectionData {
    section: FormSection;
    params: any;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dialog-section-edit',
    templateUrl: './dialog-section-edit.html',
    styleUrls: ['./dialog-section-edit.scss']
})
// tslint:disable-next-line:component-class-suffix
export class DialogSectionEdit {

    @ViewChild('survey', {static: false}) public survey: NgxSurveyComponent;

    public section: FormSection;
    public readOnly: boolean;

    public commonFields: FormItem[] = [
        buildField('string', {name: 'title', label: 'Title'}),
        buildField('string', {name: 'subtitle', label: 'Subtitle'}),
    ];

    public sectionEditForm: FormSection[] = [
        {
            children: [...this.commonFields]
        }
    ];

    constructor(
        public dialogRef: MatDialogRef<DialogSectionEdit>,
        @Inject(MAT_DIALOG_DATA) public data: DialogSectionData
    ) {
        const section = data.section;
        this.readOnly = data.params.readOnly;
        this.section = section;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onFormSubmit(data) {
        data.name = _.camelCase(data.title);
        this.section = data;
        this.dialogRef.close(this.section);
    }

    onOkClick(): void {
        this.survey.submitForm();
    }

}
