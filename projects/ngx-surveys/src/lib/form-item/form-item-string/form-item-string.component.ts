import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormItem, FormItemWidget, SurveyErrorStateMatcher} from '../index';

export class FormItemString extends FormItem {
    hint: string;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ammo-form-item-string',
    templateUrl: './form-item-string.component.html',
    styleUrls: ['./form-item-string.component.scss']
})
export class FormItemStringComponent implements FormItemWidget, OnInit, OnChanges {

    @Input() item: FormItemString;
    @Input() editable = true;
    @Output() changes = new EventEmitter<FormItemString>();
    matcher = new SurveyErrorStateMatcher();

    constructor() {
    }

    ngOnInit() {
        this.matcher.item = this.item;
    }

    ngOnChanges() {
        this.matcher.item = this.item;
    }
    onValueChanges(item) {
        this.changes.emit(item);
    }
}
