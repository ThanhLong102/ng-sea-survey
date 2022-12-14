import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormItem, FormItemWidget} from '../form-item';

export class FormItemRating extends FormItem {
    value: number;
}


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ammo-form-item-rating',
    templateUrl: './form-item-rating.component.html',
    styleUrls: ['./form-item-rating.component.scss']
})
export class FormItemRatingComponent implements FormItemWidget, OnInit {

    @Input() item: FormItemRating;
    @Input() editable = true;
    @Output() changes = new EventEmitter<FormItemRating>();

    constructor() {
    }

    ngOnInit() {

    }

    onRatingChanged(value) {
        if (!this.editable) {
            return;
        }
        this.item.value = value;
        this.changes.emit(this.item);
    }
}
