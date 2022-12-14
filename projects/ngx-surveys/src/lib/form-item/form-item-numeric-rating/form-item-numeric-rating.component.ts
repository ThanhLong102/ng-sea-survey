import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormItem, FormItemWidget} from '../form-item';

export class FormItemNumericRating extends FormItem {
    value: number;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ammo-form-item-numeric-rating',
    templateUrl: './form-item-numeric-rating.component.html',
    styleUrls: ['./form-item-numeric-rating.component.scss']
})
export class FormItemNumericRatingComponent implements FormItemWidget, OnInit {

    @Input() item: FormItemNumericRating;
    @Input() editable = true;
    @Output() changes = new EventEmitter<FormItemNumericRating>();

    constructor() {
    }

    ngOnInit() {

    }

    onSelectionChange(value) {
        this.item.value = value;
        this.changes.emit(this.item);
    }

}
