import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ResizedEvent} from 'angular-resize-event';
import {MatStepper} from '@angular/material/stepper';
import {NgxSurveyService} from '../ngx-survey.service';
import {FormItem} from '../form-item';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-form-review',
    templateUrl: './form-review.component.html',
    styleUrls: ['./form-review.component.css']
})
export class FormReviewComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() form: any[];
    @Input() value: any = {};
    @Input() splitBySteps: boolean;
    @Input() validateByStepChange = true;
    @Input() submitInProgress: boolean;
    @Input() submitErrorText: string;
    @Input() editable = true;

    @Output() valueChange = new EventEmitter<any>();
    @Output() stepChanged = new EventEmitter<any>();
    @Output() submit = new EventEmitter<any>();
    @Output() resized = new EventEmitter<ResizedEvent>();

    @ViewChild('stepper', {static: false}) public stepper: MatStepper;

    public selectedIndex = 0;
    public isMobile: boolean;

    constructor(
        private elRef: ElementRef,
        public service: NgxSurveyService,
    ) {

    }

    ngOnInit() {
        // debugger;
        console.log(this.value);
        this.form = this.service.initForm(this.form, this.value);
        if (this.splitBySteps) {
            this.form.forEach(section => {
                section.isEditable = true;
            });
        }
    }

    ngOnReInit() {
        // debugger;
        console.log(this.value);
        this.form = this.value;
        if (this.splitBySteps) {
            this.form.forEach(section => {
                section.isEditable = true;
            });
        }
    }

    ngAfterViewInit() {
        // console.log(this.stepper);
    }

    onResized(event: ResizedEvent) {

        if (event.newRect.width < 600 && !this.isMobile) {
            this.setMobileStepper(true);
        } else if (event.newRect.width >= 600 && this.isMobile) {
            this.setMobileStepper(false);
        }
        this.resized.emit(event);
        // this.width = event.newWidth;
        // this.height = event.newHeight;
    }

    scrollToField(field) {
        const el = this.elRef.nativeElement.querySelector('#form_item_' + field.name);
        if (el) {
            el.scrollIntoView();
        }
    }

    isStepEnabled(section) {
        const prevSection = this.form[this.form.indexOf(section) - 1];
        return !this.validateByStepChange || !prevSection || (prevSection && prevSection.submited && !prevSection.hasError);
    }

    onItemChanges(item) {
        if (!this.editable) {
            return;
        }
        item.errors = this.service.getErrors(item);
        const {value} = this.service.getValue(this.form, false);
        this.valueChange.emit(value);
    }

    selectionChanged(event: any): void {
        this.selectedIndex = event.selectedIndex;
    }

    setMobileStepper(isMobile: boolean): void {

        this.isMobile = isMobile;
        setTimeout(() => {
            if (this.stepper) {
                this.stepper.selectedIndex = this.selectedIndex;
            }
        });
    }

    onStepChange(step) {
        // console.log(step);
        this.stepChanged.emit(step);
        if (this.validateByStepChange && step.previouslySelectedIndex >= 0 && this.form[step.previouslySelectedIndex]) {
            this.submitStep(this.form[step.previouslySelectedIndex], false);
        }


        //        this.stepper.selectedIndex=0;
    }

    submitForm() {
        const {valid, value, firstError} = this.service.getValue(this.form, true);
        if (valid) {
            this.submit.emit(value);
        } else {
            this.scrollToField(firstError);
        }

    }

    submitStep(section, goToNext) {
        if (!this.editable) {
            return;
        }
        // console.log(section);
        const {valid, firstError} = this.service.getValue([section], true);
        // console.log({valid, value, firstError});
        if (valid) {
            section.hasError = false;
            section.submited = true;
            // console.log(this.stepper);
            if (goToNext) {
                setTimeout(() => {
                    this.stepper.next();
                }, 100);
            }

        } else {
            // console.log(firstError);
            this.scrollToField(firstError);
            section.hasError = true;
            if (firstError && firstError.errors && firstError.errors[0]) {
                section.firstErrorText = firstError.label + ': ' + firstError.errors[0].message;
            }
        }
    }

    ngOnDestroy() {
        // this._bpSub.unsubscribe();
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
