import {
    Component,
    ComponentFactoryResolver,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {FormItemDirective} from './form-item.directive';

import {FormItem, FormItemOptionItem, FormItemValidation, FormItemWidget} from './form-item';
import {FormItemString, FormItemStringComponent} from './form-item-string/form-item-string.component';
import {FormItemRating, FormItemRatingComponent} from './form-item-rating/form-item-rating.component';
import {FormItemText, FormItemTextComponent} from './form-item-text/form-item-text.component';
import {FormItemDate, FormItemDateComponent} from './form-item-date/form-item-date.component';
import {FormItemRadio, FormItemRadioComponent} from './form-item-radio/form-item-radio.component';
import {FormItemNumericRating, FormItemNumericRatingComponent} from './form-item-numeric-rating/form-item-numeric-rating.component';
import {FormItemSelect, FormItemSelectComponent} from './form-item-select/form-item-select.component';
import {FormItemOptionsEditor, FormItemOptionsEditorComponent} from './form-item-options-editor/form-item-options-editor.component';
import {FormItemCheckbox, FormItemCheckboxComponent} from './form-item-checkbox/form-item-checkbox.component';
import {Subscription} from 'rxjs';
import {FormItemFile, FormItemFileComponent} from './form-item-file/form-item-file.component';
import {FormItemVoice, FormItemVoiceComponent} from './form-item-voice/form-item-voice.component';

export const FormItemTypes = {
    'string': {
        component: FormItemStringComponent,
        model: FormItemString,
        label: 'Văn bản ngắn'
    },
    text: {
        component: FormItemTextComponent,
        model: FormItemText,
        label: 'Văn bản dài'
    },
    rating: {
        component: FormItemRatingComponent,
        model: FormItemRating,
        label: 'Bình chọn sao'
    },
    numericRating: {
        component: FormItemNumericRatingComponent,
        model: FormItemNumericRating,
        label: 'Bình chọn số'
    },
    radio: {
        component: FormItemRadioComponent,
        model: FormItemRadio,
        label: 'Nhiều lựa chọn'
    },
    select: {
        component: FormItemSelectComponent,
        model: FormItemSelect,
    },
    optionsEditor: {
        component: FormItemOptionsEditorComponent,
        model: FormItemOptionsEditor
    },
    checkbox: {
        component: FormItemCheckboxComponent,
        model: FormItemCheckbox,
        label: 'Checkbox'
    },
    date: {
        component: FormItemDateComponent,
        model: FormItemDate,
        label: 'Ngày tháng'
    },
    file: {
        component: FormItemFileComponent,
        model: FormItemFile,
        label: 'File Upload'
    },
    voice: {
        component: FormItemVoiceComponent,
        model: FormItemVoice,
        label: 'Ghi âm'
    },
};

export function buildOption(optionValue: string, label: string): FormItemOptionItem {
    return <FormItemOptionItem>{optionValue, label};
}

export function buildField(type: string, data: any, required?: boolean): FormItem {
    const obj = Object.assign(new (FormItemTypes[type].model), data);
    obj.type = type;

    if (required) {
        (<FormItemValidation>obj.fieldValidations) = {
            rules: [
                {
                    minLength: 1
                }
            ]
        };
    }

    return obj;
}


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ngx-survey-form-item',
    templateUrl: './form-item.component.html',
    styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent implements OnInit, OnDestroy, OnChanges {

    @Input() type: string;
    @Input() item: FormItem | FormItemString | FormItemRating | FormItemText | FormItemDate | FormItemRadio | FormItemNumericRating
        | FormItemSelect | FormItemOptionsEditor | FormItemCheckbox | FormItemFile;
    @Input() editable = true;
    @Input() isMobile = false;
    @Input() id: string;
    @Output() changes = new EventEmitter<any>();

    @ViewChild(FormItemDirective, {static: true}) public itemHost: FormItemDirective;

    private subscription: Subscription;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {

    }

    ngOnInit() {
        this.loadComponent();
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes && (changes.type || changes.id)) {
            this.loadComponent();
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }


    }

    loadComponent() {
        if (!FormItemTypes[this.type]) {
            return;
        }

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormItemTypes[this.type].component);

        const viewContainerRef = this.itemHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<FormItemWidget>componentRef.instance).item = this.item;
        (<FormItemWidget>componentRef.instance).editable = this.editable;
        (<FormItemWidget>componentRef.instance).isMobile = this.isMobile;

        this.subscription = (<FormItemWidget>componentRef.instance).changes.subscribe(item => this.changes.emit(item));
    }

}
