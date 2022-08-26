import { EventEmitter } from '@angular/core';
import { Observable, Observer } from 'rxjs';

export interface FormItemError {
    type?: string;
    message?: string;
}

export interface FormItemValidationRules {
    minLength?: number;
    optionKeyValues?: boolean;
}

export interface FormItemValidation {
    rules: FormItemValidationRules[];
}

export class FormItem {
    id: string;
    type: string;
    name: string;
    label: string;
    style: string;
    hint: string;
    visibleRule: string;
    value: string | number | string[] | boolean | FormItemOptionItem[] | SurveyFile[] | SurveyFile;
    errors: FormItemError[];
    fieldValidations: FormItemValidation;
    fieldValidation: FormItemValidationRules;
    hasOptions: boolean;
    justAdded:  boolean;
    required:  boolean;
    readOnly:  boolean;
    multiple:  boolean;
    actionUpdatesTableValue: boolean;
    actionUpdatesSectionValue: boolean;
    visibilityValuesInTable: string[];
    visibilityValuesInSection: string[];
    children?: FormItemOptionItem[];
    segments?: FormItemOptionItem[];
    isSectionValueItem?: boolean;
}

export interface FormItemOptionItem {
    optionValue: string;
    label: string;
    showExplanation?: boolean;
    explanationLabel?: string;
    selected?: boolean;
    reason?: string;
}


export interface FormItemWidget {
    item: FormItem;
    editable: boolean;
    isMobile?: boolean;
    changes: EventEmitter<FormItem>;
}

export interface FormSection {
    name?: string;
    title?: string;
    subtitle?: string;
    sectionStyle?: string;
    children?: FormItem[];
    isEditable?: boolean;
    hasError?: boolean;
    firstErrorText?: string;
}

export interface FormSurvey {
    id: string;
    title: string;
    description?: string;
    type?: string;
    attribute?: SurveyAttribute;
    children: FormSection[];
}

export class SurveyAttribute {
    suffix?: string;
    submitButton?: string;
}

export class SurveyFile {
    progressSubject: Observable<number>;
    progressObserver: Observer<number>;
    progressValue: number;
    uploading: boolean;
    name: string;
    size: number;
    mime: string;
    src: string | ArrayBuffer | null;
    url: string;
    file: File;
    duration: number;
}
