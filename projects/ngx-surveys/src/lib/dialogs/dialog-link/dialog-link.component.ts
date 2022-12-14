import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {NgxSurveyComponent} from '../../ngx-survey.component';
import {buildField, buildOption, FormItem, FormItemOptionItem, FormItemTypes} from '../../form-item';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogItemData} from '../dialog-item-edit/dialog-item-edit';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-dialog-link',
    templateUrl: './dialog-link.component.html',
    styleUrls: ['./dialog-link.component.css']
})
export class DialogLinkComponent implements OnInit {

    @ViewChild('survey', {static: false}) public survey: NgxSurveyComponent;
    public results: string[] = [];

    public resultsData: string[] = [];

    public item: FormItem;

    public items: FormItem[];

    public commonFields: FormItem[];
    public itemEditForm: any[];

    public multiChoiseFieldsOnly: boolean;
    public customFieldNamesAllowed: boolean;
    public readOnly: boolean;

    public multiChoiseFieldTypes: string[] = ['radio', 'select', 'segments'];

    constructor(
        public dialogRef: MatDialogRef<DialogLinkComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogItemData
    ) {
        console.log(data, this.commonFields);
        const item = data.item;
        if (item.fieldValidations && item.fieldValidations.rules && item.fieldValidations.rules.find(r => r.minLength && r.minLength > 0)) {
            item.required = true;
        }
        this.item = item;
        this.resultsData = item.visibleRule ? item.visibleRule.split('-') : [];
        this.resultsData.map((i) => this.results.push(i.split('.')[1]));
        this.items = data.items;
        console.log('day la items', this.items);
        this.multiChoiseFieldsOnly = data.params.multiChoiseFieldsOnly;
        this.customFieldNamesAllowed = data.params.customFieldNamesAllowed;
        this.readOnly = data.params.readOnly;
        this.setFormFields();
    }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    setFormFields() {// tslint:disable-next-line:max-line-length
        console.log(Object.keys(FormItemTypes).filter(key => this.multiChoiseFieldsOnly ? this.multiChoiseFieldTypes.indexOf(key) >= 0 : true));
        this.commonFields = [
            buildField('select', {
                name: 'type',
                label: 'Lo???i c??u h???i',
                // tslint:disable-next-line:max-line-length
                children: Object.keys(FormItemTypes).filter(key => this.multiChoiseFieldsOnly ? this.multiChoiseFieldTypes.indexOf(key) >= 0 : true).map(key => {
                    const item = <FormItemOptionItem>FormItemTypes[key];
                    return item.label ? buildOption(key, item.label) : null;
                }).filter(t => t),
                actionUpdatesSectionValue: true
            }, true),
            buildField('select', {
                name: 'style', label: 'Ch???n lo???i', children: [
                    buildOption('text', 'V??n b???n chu???n'),
                    buildOption('number', 'Ki???u s???'),
                    buildOption('email', 'E-mail'),
                    buildOption('password', 'M???t kh???u'),
                    buildOption('url', '???????ng d???n (URL)'),
                ], visibilityValuesInSection: ['string'], value: 'text'
            }, true),
            buildField('select', {
                name: 'fileType', label: 'Uploader Type', children: [
                    buildOption('image', 'H??nh ???nh'),
                    buildOption('video', 'Video'),
                    buildOption('file', 'File b???t k???'),
                ], visibilityValuesInSection: ['file'], value: 'image'
            }, true),
            buildField('select', {
                name: 'style', label: 'Lo???i', children: [
                    buildOption('list', 'Danh s??ch v???i l???a ch???n'),
                    buildOption('buttons', 'N??t radio'),
                    buildOption('select', 'Select'),
                    buildOption('custom', 'Custom'),
                ], visibilityValuesInSection: ['radio'], value: 'list'
            }, true),
            buildField('checkbox', {name: 'multiple', label: 'Cho ph??p t???i l??n nhi???u file', visibilityValuesInSection: ['file']}),
            buildField('string', {
                name: 'name',
                label: 'T??n',
                visibilityValuesInSection: !this.customFieldNamesAllowed ? ['none'] : undefined
            }, false),
            buildField('string', {name: 'label', label: 'Nh??n'}),
            buildField('string', {name: 'hint', label: 'G???i ??'}),
            buildField('checkbox', {name: 'required', label: 'B???t bu???c'}),
            buildField('checkbox', {
                name: 'actionUpdatesSectionValue',
                label: 'Action Updates Section Value',
                visibilityValuesInSection: [this.multiChoiseFieldTypes]
            }),
            buildField('checkbox', {name: 'multiple', label: 'Nhi???u c??u tr??? l???i', visibilityValuesInSection: ['radio']}),
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
        console.log(values);
        console.log(optionsEditField);
        console.log(this.itemEditForm);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onFormSubmit(item) {
        let temp = '';
        for (let i = 0; i < this.resultsData.length; i++) {
            if (i === this.resultsData.length - 1) {
                temp += this.resultsData[i];

            } else {
                temp += this.resultsData[i] + '-';
            }
        }
        item.visibleRule = temp;
        this.item = item;
        this.dialogRef.close(this.item);
    }

    onOkClick(): void {
        this.survey.submitForm();
    }

    getChoose(event) {
        this.resultsData.push(event.id + '.' + event.optionValue);
        this.results.push(event.optionValue);
    }

    remove(index) {
        this.results = this.results.filter((item, key) => key !== index);
        this.resultsData = this.resultsData.filter((item, key) => key !== index);
    }
}
