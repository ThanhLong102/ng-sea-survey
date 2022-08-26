import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormItem, FormItemWidget, SurveyErrorStateMatcher} from '../index';

export class FormItemText extends FormItem {
    hint: string;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ammo-form-item-text',
    templateUrl: './form-item-text.component.html',
    styleUrls: ['./form-item-text.component.scss']
})
export class FormItemTextComponent implements FormItemWidget, OnInit, OnChanges {

    @Input() item: FormItemText;
    @Input() editable = true;
    @Output() changes = new EventEmitter<FormItemText>();
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
