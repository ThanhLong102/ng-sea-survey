import {Component, Inject, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgxSurveyComponent} from '../../ngx-survey.component';
import {buildField, FormItem, FormSection} from '../../form-item';


export interface FormItemVisibilityData {
    sectionItems: FormItem[];
    visibility: string[];
    readOnly: boolean;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dialog-item-visibility',
    templateUrl: './dialog-item-visibility.html',
    styleUrls: ['./dialog-item-visibility.scss']
})
// tslint:disable-next-line:component-class-suffix
export class DialogItemVisibility {

    @ViewChild('survey', {static: false}) public survey: NgxSurveyComponent;

    public formFields: FormItem[] = [];
    public itemEditForm: FormSection[] = [
        {
            children: []
        }
    ];

    public value: any;
    public readOnly: boolean;

    constructor(
        public dialogRef: MatDialogRef<DialogItemVisibility>,
        @Inject(MAT_DIALOG_DATA) public data: FormItemVisibilityData
    ) {
        console.log(data);
        const value = {};
        this.formFields = data.sectionItems.map(item => {
            this.data.visibility.forEach(val => {
                if ((item.children || item.segments)?.find(op => val.indexOf(op.optionValue) >= 0)) {
                    value[item.name] = val;
                }
            });
            // tslint:disable-next-line:max-line-length
            return buildField('radio', {
                name: item.name,
                label: item.label || item.name,
                children: item.children || item.segments,
                multiple: true
            }, false);
        });
        this.value = value;
        this.itemEditForm = [{
            children: this.formFields
        }];
        this.readOnly = data.readOnly;
        console.log(this.itemEditForm, value);
    }

    onFormChange(values) {
        console.log(values);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onFormSubmit(value) {
        this.dialogRef.close(value);
    }

    onOkClick(): void {
        // console.log(this.data);
        this.survey.submitForm();
    }

}
