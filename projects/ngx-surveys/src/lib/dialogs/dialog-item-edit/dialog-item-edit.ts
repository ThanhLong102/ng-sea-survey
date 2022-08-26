import {Component, Inject, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgxSurveyComponent} from '../../ngx-survey.component';
import {buildField, buildOption, FormItem, FormItemOptionItem, FormItemTypes} from '../../form-item';
import * as _ from 'lodash';

export interface DialogItemData {
    item: FormItem;
    params: any;
    items: FormItem[];
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dialog-item-edit',
    templateUrl: './dialog-item-edit.html',
    styleUrls: ['./dialog-item-edit.scss']
})
// tslint:disable-next-line:component-class-suffix
export class DialogItemEdit {

    @ViewChild('survey', {static: false}) public survey: NgxSurveyComponent;

    public item: FormItem;
    public commonFields: FormItem[];
    public itemEditForm: any[];
    public multiChoiseFieldsOnly: boolean;
    public customFieldNamesAllowed: boolean;
    public readOnly: boolean;

    public multiChoiseFieldTypes: string[] = ['radio', 'select', 'segments'];

    constructor(
        public dialogRef: MatDialogRef<DialogItemEdit>,
        @Inject(MAT_DIALOG_DATA) public data: DialogItemData
    ) {
        console.log(data, this.commonFields);
        const item = data.item;
        if (item.fieldValidations && item.fieldValidations.rules && item.fieldValidations.rules.find(r => r.minLength && r.minLength > 0)) {
            item.required = true;
        }
        this.item = item;
        this.multiChoiseFieldsOnly = data.params.multiChoiseFieldsOnly;
        this.customFieldNamesAllowed = data.params.customFieldNamesAllowed;
        this.readOnly = data.params.readOnly;
        this.setFormFields();
    }

    setFormFields() {
        // tslint:disable-next-line:max-line-length
        console.log(Object.keys(FormItemTypes).filter(key => this.multiChoiseFieldsOnly ? this.multiChoiseFieldTypes.indexOf(key) >= 0 : true));
        this.commonFields = [
            buildField('select', {
                name: 'type',
                label: 'Loại câu hỏi',
                // tslint:disable-next-line:max-line-length
                children: Object.keys(FormItemTypes).filter(key => this.multiChoiseFieldsOnly ? this.multiChoiseFieldTypes.indexOf(key) >= 0 : true).map(key => {
                    const item = <FormItemOptionItem>FormItemTypes[key];
                    return item.label ? buildOption(key, item.label) : null;
                }).filter(t => t),
                actionUpdatesSectionValue: true
            }, true),
            buildField('select', {
                name: 'style', label: 'Chọn loại', children: [
                    buildOption('text', 'Văn bản chuẩn'),
                    buildOption('number', 'Kiểu số'),
                    buildOption('email', 'E-mail'),
                    buildOption('password', 'Mật khẩu'),
                    buildOption('url', 'Đường dẫn (URL)'),
                ], visibilityValuesInSection: ['string'], value: 'text'
            }, true),
            buildField('select', {
                name: 'fileType', label: 'Uploader Type', children: [
                    buildOption('image', 'Hình ảnh'),
                    buildOption('video', 'Video'),
                    buildOption('file', 'File bất kỳ'),
                ], visibilityValuesInSection: ['file'], value: 'image'
            }, true),
            buildField('select', {
                name: 'style', label: 'Loại', children: [
                    buildOption('list', 'Danh sách với lựa chọn'),
                    buildOption('buttons', 'Nút radio'),
                    buildOption('select', 'Select'),
                    buildOption('custom', 'Custom'),
                ], visibilityValuesInSection: ['radio'], value: 'list'
            }, true),
            buildField('checkbox', {name: 'multiple', label: 'Cho phép tải lên nhiều file', visibilityValuesInSection: ['file']}),
            buildField('string', {
                name: 'name',
                label: 'Tên',
                visibilityValuesInSection: !this.customFieldNamesAllowed ? ['none'] : undefined
            }, false),
            buildField('string', {name: 'label', label: 'Nhãn'}),
            buildField('string', {name: 'hint', label: 'Gợi ý'}),
            buildField('checkbox', {name: 'required', label: 'Bắt buộc'}),
            buildField('checkbox', {
                name: 'actionUpdatesSectionValue',
                label: 'Thêm lý do cho từng câu trả lời',
                visibilityValuesInSection: [this.multiChoiseFieldTypes]
            }),
            buildField('checkbox', {name: 'multiple', label: 'Nhiều câu trả lời', visibilityValuesInSection: ['radio']}),
            buildField('optionsEditor', {
                name: 'children',
                label: 'Options',
                visibilityValuesInSection: [['radio', 'select']],
                allowCustomAnswers: !this.multiChoiseFieldsOnly,
                allowCustomOptionValues: this.customFieldNamesAllowed,
                defaultValue: this.item.value,
                multiple: this.item.multiple
            }),
        ];
        this.itemEditForm = [
            {
                children: [...this.commonFields]
            }
        ];
    }

    onFormChange(values: FormItem) {
        console.log(values, this.itemEditForm);
        const optionsEditField = this.itemEditForm[0].children.find(f => f.name === 'children');
        if (optionsEditField && optionsEditField.multiple !== values.multiple) {
            optionsEditField.multiple = values.multiple;
            if (values.multiple) {
                optionsEditField.defaultValue = [];
            }
        }
        console.log(optionsEditField);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onFormSubmit(item) {
        if (!item.fieldValidations) {
            item.fieldValidations = {};
        }
        if (!item.fieldValidations.rules) {
            item.fieldValidations.rules = [];
        }
        item.name = _.camelCase(item.label);
        console.log(item);
        const minLengthRule = item.fieldValidations.rules.find(r => r.minLength > 0);
        console.log(item, minLengthRule);
        if (item.required && !minLengthRule) {
            item.fieldValidations.rules.push({
                minLength: 1
            });
        } else if (!item.required && minLengthRule) {
            minLengthRule.minLength = 0;
        }
        ['segments', 'children'].forEach(key => {
            if (item[key] && item[key].length) {
                const defaultValArr: string[] = [];
                let defaultValStr = '';
                item[key].forEach(option => {
                    if (option.selected) {
                        defaultValArr.push(option.optionValue);
                        defaultValStr = option.optionValue;
                    }
                    delete option.selected;
                });
                item.value = item.multiple ? defaultValArr : defaultValStr;
            }
        });
        if (item.id === null) {
            item.id = Math.random().toString(36).slice(2, 6);
        }
        this.item = item;
        this.dialogRef.close(this.item);
    }

    onOkClick(): void {
        // console.log(this.data);
        this.survey.submitForm();
    }

}
