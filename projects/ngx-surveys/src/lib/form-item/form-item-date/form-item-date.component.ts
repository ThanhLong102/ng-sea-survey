import {AfterViewInit, Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {FormItem, FormItemWidget, SurveyErrorStateMatcher} from '../index';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import * as moment from 'moment';

export class FormItemDate extends FormItem {

}


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormItemDateComponent),
    multi: true
};

const noop = () => {
};

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ammo-form-item-date',
    templateUrl: './form-item-date.component.html',
    styleUrls: ['./form-item-date.component.scss'],
    providers: [
        CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
    ],
})
export class FormItemDateComponent implements FormItemWidget, OnInit, OnChanges, AfterViewInit, ControlValueAccessor {

    constructor() {
    }


    // get accessor
    get value(): any {
        return this.innerValue;
    }

    get textValue(): string {
        return this.value ? this.value.format('L') : '';
    }

    // set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }

    @ViewChild('inputField', {static: true}) public inputField: MatInput;

    @Input() item: FormItemDate;
    @Input() editable = true;
    @Output() changes = new EventEmitter<FormItemDate>();
    matcher = new SurveyErrorStateMatcher();

    innerValue: any;

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    ngOnInit() {
        this.matcher.item = this.item;
        if (this.item.value) {
            this.value = moment(this.item.value.toString()); //
        }
        this.onTouchedCallback();
    }

    ngAfterViewInit() {
        // console.log(this.inputField);
        this.inputField.value = '5/14/2021';
    }

    ngOnChanges() {
        this.matcher.item = this.item;
    }

    onValueChanges(ev) {
        this.item.value = ev.value ? ev.value.format('L') : '';
        this.changes.emit(this.item);
    }

    writeValue(value: any): void {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    onChange(event) {
        this.value = event;
        this.onBlur();
    }

    onBlur() {
        this.onChangeCallback(this.innerValue);
    }

    toDate(value) {
        this.value = value ? moment(value) : '';
        this.onValueChanges({
            value: this.value
        });
    }

}
