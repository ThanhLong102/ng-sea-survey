import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormItem} from '../../../form-item';

export interface ItemLink {
    id: string;
    optionValue: string;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-item-tree',
    templateUrl: './item-tree.component.html',
    styleUrls: ['./item-tree.component.css']
})
export class ItemTreeComponent implements OnInit {

    @Input() public item: FormItem;
    @Output() public chose = new EventEmitter<ItemLink>();

    constructor() {
    }

    ngOnInit(): void {
    }

    choseChildren(children) {
        this.chose.emit(children);
    }

}
