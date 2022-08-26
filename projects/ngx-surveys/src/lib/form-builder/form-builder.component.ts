import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {NgxSurveyService} from '../ngx-survey.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import * as _ from 'lodash';
import * as moment from 'moment';

import {MatDialog} from '@angular/material/dialog';

import {DialogItemEdit, DialogItemVisibility, DialogSectionEdit} from '../dialogs';
import {buildField, FormItem, FormItemComponent, FormSection} from '../form-item';
import {DialogLinkComponent} from '../dialogs/dialog-link/dialog-link.component';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ngx-survey-form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

    @Input() set form(form: any[]) {
        this._form = this.service.initForm(form, this.formValues);
        // console.log(this._form);
    }

    get form(): FormSection[] {
        return this._form;
    }

    constructor(
        public service: NgxSurveyService,
        public dialog: MatDialog,
    ) {
    }


    @Output() changes = new EventEmitter<any[]>();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onFieldAdded = new EventEmitter<FormItem>();
    @Input() allowMultiChoiseFieldsOnly = false;
    @Input() enableEditFieldValues = true;
    @Input() showFieldNames = true;
    @Input() readOnly = false;

    @ViewChildren('formFieldItem') formItemElements: QueryList<FormItemComponent>;

    private _form;
    public formValues: any = {};

    public sortableSectionOptions: any = {
        onUpdate: (event: any) => {
            console.log(event);
            this.changes.emit(this.form);
        },
    };

    public sortableItemOptions: any = {
        onUpdate: (event: any) => {
            console.log(event);
            this.changes.emit(this.form);
        },
        handle: '.form-item'
    };

    onSectionDropped(event: CdkDragDrop<FormItem[]>) {
        const previousIndex = this.form.findIndex(row => event.item && row === event.item.data);
        moveItemInArray(this.form, previousIndex, event.currentIndex);
        this.form = this.form.slice();
        this.changes.emit(this.form);
    }

    onItemDropped(event: CdkDragDrop<FormItem[]>, section: FormSection) {
        const previousIndex = (section.children || []).findIndex(row => event.item && row === event.item.data);
        moveItemInArray((section.children || []), previousIndex, event.currentIndex);
        section.children = (section.children || []).slice();
        this.changes.emit(this.form);
    }


    openSectionDialog(section: FormSection): void {
        const dialogRef = this.dialog.open(DialogSectionEdit, {
            width: '450px',
            data: {
                params: {
                    readOnly: this.readOnly,
                },
                section: section
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if (result && !this.readOnly) {
                section = _.extend(section, result);
                this.changes.emit(this.form);
            }

        });
    }

    openItemDialog(item: FormItem, section?: FormSection): void {
        const dialogRef = this.dialog.open(DialogItemEdit, {
            width: '50rem',
            data: {
                params: {
                    multiChoiseFieldsOnly: this.allowMultiChoiseFieldsOnly,
                    customFieldNamesAllowed: this.showFieldNames,
                    readOnly: this.readOnly,
                },
                item: _.cloneDeep(item)
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result, section);
            if (result && !this.readOnly) {
                item = _.extend(item, result);
                const itemComponent = this.formItemElements.find(el => el.item === item);
                if (section) {
                    item.name = _.camelCase((section.name || '') + ' ' + item.name);
                }
                if (item.justAdded) {
                    this.onFieldAdded.emit(item);
                }

                item.justAdded = false;
                this.changes.emit(this.form);
                if (itemComponent) {
                    itemComponent.loadComponent();
                }
            } else if (section && item.justAdded) {
                this.removeField(item, section);
            }
        });
    }

    openLinkComponent(item: FormItem, section?: FormSection): void {
        const tempItems: FormItem[] = [];
        for (let i = 0; i < this._form.length; i++) {
            if (section === this._form[i]) {
                for (let j = 0; j < this._form[i].children.length; j++) {
                    if (this._form[i].children[j] === item) {
                        break;
                    }
                    tempItems.push(this._form[i].children[j]);
                }
            }
        }
        const dialogRef = this.dialog.open(DialogLinkComponent, {
            width: '1000px',
            data: {
                params: {
                    multiChoiseFieldsOnly: this.allowMultiChoiseFieldsOnly,
                    customFieldNamesAllowed: this.showFieldNames,
                    readOnly: this.readOnly,
                },
                item: _.cloneDeep(item),
                items: _.cloneDeep(tempItems)
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result, section);
            if (result && !this.readOnly) {
                item = _.extend(item, result);
                const itemComponent = this.formItemElements.find(el => el.item === item);
                if (section) {
                    item.name = _.camelCase((section.name || '') + ' ' + item.name);
                }
                if (item.justAdded) {
                    this.onFieldAdded.emit(item);
                }

                item.justAdded = false;
                this.changes.emit(this.form);
                if (itemComponent) {
                    itemComponent.loadComponent();
                }
            } else if (section && item.justAdded) {
                this.removeField(item, section);
            }
        });
    }

    getSectionValueItemsForItem(item: FormItem, section: FormSection) {
        return (section.children || []).filter(sItem => sItem.actionUpdatesSectionValue && sItem.name !== item.name);
    }

    openItemVisibilityDialog(item: FormItem, section: FormSection): void {
        const sectionValueItems = this.getSectionValueItemsForItem(item, section);

        const dialogRef = this.dialog.open(DialogItemVisibility, {
            width: '450px',
            data: {
                sectionItems: sectionValueItems,
                visibility: item.visibilityValuesInSection || [],
                readOnly: this.readOnly,
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if (result && !this.readOnly) {
                item.visibilityValuesInSection = [];
                sectionValueItems.forEach(sItem => {
                    if (result[sItem.name]) {
                        item.visibilityValuesInSection.push(result[sItem.name]);
                    }
                });
                console.log(item);
                this.changes.emit(this.form);
            }

            /*
            if (result){
                item=_.extend(item, result);
                this.changes.emit(this.form);
            }
            else if(section && item.justAdded) {
                this.removeField(item, section);
            }*/
        });
    }

    ngOnInit() {
    }

    getDateStr(time) {
        time = time / 1000000;
        return moment.utc(time).format('MM/DD/YYYY');
    }

    getDateValue(str) {
        const dt = new Date(str);
        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

        return dt;
    }

    onItemChanges(item: FormItem): void {
        item.errors = this.service.getErrors(item);
        this.changes.emit(this.form);
    }

    removeField(item: FormItem, section: FormSection): void {
        section.children = (section.children || []).filter((op, index) => index !== (section.children || []).indexOf(item));
        this.changes.emit(this.form);
    }

    cloneItem(item: FormItem, section: FormSection): void {
        // section.children=(section.children || []).filter((op, index)=>index!==(section.children || []).indexOf(item));
        // console.log(item);
        if (this.readOnly) {
            return;
        }
        const newItem = _.cloneDeep(item);
        let newName = newItem.name + '_clone';
        if (section.children?.find(sec => sec.name === newName)) {
            const index = section.children?.filter(sec => sec.name.indexOf(newName) >= 0).length;
            newName += '_' + index;
        }
        newItem.name = newName;
        newItem.actionUpdatesSectionValue = false;
        section.children?.splice(section.children?.indexOf(item) + 1, 0, newItem);
        this.changes.emit(this.form);
    }

    clearValue(item: FormItem): void {
        item.value = '';
        this.changes.emit(this.form);
    }

    addFiedld(section: FormSection): void {
        if (!section.children) {
            section.children = [];
        }
        const field = this.allowMultiChoiseFieldsOnly ? buildField('radio', {
            name: '',
            label: '',
            children: [],
            style: 'list'
        }, true) : buildField('string', {name: '', label: ''});
        field.justAdded = true;
        section.children.push(field);
        this.openItemDialog(field, section);
    }

    removeSection(section: FormSection): void {
        this.form = this.form.filter((op, index) => index !== this.form.indexOf(section));
        this.changes.emit(this.form);
    }

    addSection(): void {
        this.form.push(<FormSection>{});
    }

    checkDisplay(item: FormItem, section: any): boolean {
        if (!item.visibleRule) {
            return true;
        }
        for (let i = 0; i < section.children.length; i++) {
            const temp = section.children[i].id + '.' + section.children[i].value;
            const tempArray = item.visibleRule.split('-');
            for (let j = 0; j < tempArray.length; j++) {
                if (temp.includes(tempArray[j])) {
                    return true;
                }
            }
        }
        return false;
    }
}
