/* tslint:disable */
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgxSurveyComponent} from '../../../projects/ngx-surveys/src/public-api';
import {NgxSurveyService} from '../../../projects/ngx-surveys/src/lib/ngx-survey.service';
import {Subscription} from 'rxjs';

import objectMapper from 'object-mapper';
import {Child, SurveyModel} from '../model/survey.model';
import {SurveyService} from '../service/survey.service';
import {ProjectRequestModel} from '../model/projectRequest.model';
import {DataSource, QuestionType, SurveySchemaModel} from '../model/surveySchema.model';
import {ProjectModeEnum} from '../model/projectModeEnum';
import { Router } from '@angular/router';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    styles: [
        `
            :host {
                width: 80%;
                display: block;
                margin: 50px auto 40px;
            }

            pre {
                background-color: white;
                padding: 30px;
                border: 1px solid #ccc;
            }

            .submit-button {
                width: 100%;
                margin-top: 10px;
            }
        `,
    ],
})
export class DemoComponent implements OnInit, OnDestroy {

    @ViewChild('survey', {static: false}) public survey: NgxSurveyComponent;

    public form : any[] = [];
    public model = {};
    private fileUpoadSubscription: Subscription;
    public selectedIndex = 1;
    id = 'KcGr7R';

    constructor(
        surveyService: NgxSurveyService, private surveyServiceModel: SurveyService,
        private router: Router
    ) {

        this.fileUpoadSubscription = surveyService.onFilesSelected.subscribe(files => {
            let request = {basePath: this.id, file: files[0].file, storageType: 2};
            this.surveyServiceModel.postUpload(request).subscribe(
                data => {
                    console.log('Day la fileView', data);
                },
                error => console.log(error)
            );
            files.forEach(surveyFile => {
                let i = 0;
                const interval = setInterval(() => {
                    i++;
                    if (i >= 100) {
                        clearInterval(interval);
                        surveyFile.uploading = false;
                    }
                    surveyFile.progressObserver.next(i);
                }, 30);
            });
        });
    }

    ngOnInit() {
        this.initFormCurrent(this.id);
    }

    initFormCurrent(id) {
        this.surveyServiceModel.getProject(id).subscribe(project => {
                console.log(project);
                this.form = project.data.survey?.children;
                for (let i = 0; i < this.form.length; i++) {
                    for (let j = 0; j < this.form[i]?.children.length; j++) {
                        if (this.form[i].children[j].type === QuestionType.Radio) {
                            let map = {
                                'label': 'label',
                                'value': 'optionValue'
                            };
                            this.form[i].children[j].children = [];
                            for (let k = 0; k < this.form[i].children[j].dataSource?.length; k++) {
                                let dest = objectMapper(this.form[i].children[j].dataSource[k], map);
                                this.form[i].children[j].children.push(dest);
                            }
                        }
                        this.form[i].children[j].label = this.form[i].children[j].description;
                        this.form[i].children[j].name = this.form[i].children[j].title;
                        this.form[i].children[j].type = this.mapTypeToForm(this.form[i].children[j].type);
                        this.form[i].children[j].required = this.form[i].children[j].attribute?.required;
                        this.form[i].children[j].value = this.form[i].children[j].attribute?.defaultValue;
                        this.form[i].children[j].style = this.form[i].children[j].attribute?.dataType;
                        this.form[i].children[j].multiple = this.form[i].children[j].attribute?.multiple;
                        this.form[i].children[j].hint = this.form[i].children[j].attribute?.hint;
                        this.form[i].children[j].justAdded = this.form[i].children[j].attribute?.justAdded;
                        this.form[i].children[j].actionUpdatesSectionValue = this.form[i].children[j].attribute?.actionUpdatesSectionValue;
                        this.form[i].children[j].fileType = this.form[i].children[j].attribute?.fileType;
                        this.form[i].children[j].visibleRule = this.form[i].children[j].attribute?.visibleRule;
                    }
                }

                this.model = this.form;
                if (this.survey) {
                    this.survey.value = this.form;
                    this.survey.ngOnInit();
                }
            },
            error => console.log(error)
        );
    }


    ngOnDestroy(): void {
        this.fileUpoadSubscription.unsubscribe();
    }

    onFormSubmit(value) {
        console.log(value);
        this.model = value;
        alert(JSON.stringify(value, null, 2));
    }

    onChange(value) {
        this.model = value;
        console.log(value);
        this.survey.value = this.model;
    }

    onChangeEvent(event: MouseEvent) {
        console.log(event, event.toString(), JSON.stringify(event));
    }

    onValueChange(value: boolean) {
        this.model = value;
        this.survey.value = this.model;
        console.log(value);
    }

    onSave() {
        debugger;
        console.log(this.form);

        this.survey.submitForm();
        console.log(JSON.stringify(this.form));
    }

    onPreview() {
        if (this.survey) {
            this.survey.value = this.model;
            this.survey.ngOnReInit();
        }

        this.selectedIndex = 2;
    }

    tabClick(event: any) {
        if (event.index == 2) {
            this.onPreview();
        }
    }

    saveProject() {
        const projects = this.mapperToData();
        if (projects?.id) {
            this.surveyServiceModel.update(projects).subscribe(
                (value) => console.log(value),
                error => console.error(error));
        } else {
            this.surveyServiceModel.create(projects).subscribe(
                (value) => console.log(value),
                error => console.error(error));
        }
    }

    mapper() {
        console.log('model', this.model);
        console.log('survey', this.survey.value);
        console.log('form', this.form);
        let map = {
            'name': 'id',
            'label': 'title',
            'type': 'type',
            'required': 'attribute.required',
            'value': 'attribute.display'
        };

        let children: Child[] = [];
        this.survey.value.forEach(v => {
            v.children.forEach(c => {
                let dest = objectMapper(c, map);
                children.push(dest);
            });
        });

        let survey = new SurveyModel();
        survey.id = 'test-mapper';
        survey.title = 'Test';
        survey.description = 'This is test';
        survey.type = '';
        survey.children = children;

        console.log(survey);
    }

    mapTypeToForm(type) {
        if (type === QuestionType.FillBlank) {
            return 'string';
        } else if (type === QuestionType.Score) {
            return 'rating';
        } else if (type === QuestionType.Textarea) {
            return 'text';
        } else if (type === QuestionType.Radio) {
            return 'radio';
        } else if (type === QuestionType.Checkbox) {
            return 'checkbox';
        } else if (type === QuestionType.Cascader) {
            return 'date';
        } else if (type === QuestionType.Upload) {
            return 'file';
        } else if (type === QuestionType.Remark) {
            return 'voice';
        } else {
            return;
        }
    }

    mapTypeToData(type) {
        if (type === 'string') {
            return QuestionType.FillBlank;
        } else if (type === 'rating') {
            return QuestionType.Score;
        } else if (type === 'text') {
            return QuestionType.Textarea;
        } else if (type === 'radio') {
            return QuestionType.Radio;
        } else if (type === 'checkbox') {
            return QuestionType.Checkbox;
        } else if (type === 'date') {
            return QuestionType.Cascader;
        } else if (type === 'file') {
            return QuestionType.Upload;
        } else if (type === 'voice') {
            return QuestionType.Remark;
        } else {
            return;
        }
    }

    mapperToData(): ProjectRequestModel {
        let map = {
            'id':'id',
            'name': 'title',
            'description': 'description',
            'type': 'type',
            'required': 'attribute.required',
            'style': 'attribute.dataType',
            'multiple': 'attribute.multiple',
            'hint': 'attribute.hint',
            'value': 'attribute.defaultValue',
            'justAdded': 'attribute.justAdded',
            'fileType': 'attribute.fileType',
            'actionUpdatesSectionValue': 'attribute.actionUpdatesSectionValue',
            'visibleRule': 'attribute.visibleRule'
        };

        //Map
        let surveys: SurveySchemaModel[] = [];
        this.survey?.value?.forEach(v => {

            let survey = new SurveySchemaModel();
            survey.id = Math.random().toString(36).slice(2, 7);
            survey.title = v.title;
            survey.type = v.type;

            let children: SurveySchemaModel[] = [];
            v?.children.forEach(c => {
                let dest = objectMapper(c, map);

                let dataSources: DataSource[] = [];
                if (dest.type === 'radio') {
                    for (let i = 0; i < c.children.length; i++) {
                        let dataSource = new DataSource();
                        dataSource.label = c.children[i].label;
                        dataSource.value = c.children[i].optionValue;
                        dataSources.push(dataSource);
                    }
                }

                dest.dataSource = dataSources;
                dest.type = this.mapTypeToData(dest.type);
                children.push(dest);
            });

            survey.children = children;
            surveys.push(survey);
        });
        let projectRequestModel = new ProjectRequestModel();
        let survey = new SurveySchemaModel();
        survey.id = Math.random().toString(36).slice(2, 8);
        survey.type = QuestionType.Survey;
        survey.children = surveys;
        projectRequestModel.name = 'Survey';
        projectRequestModel.mode = ProjectModeEnum.survey;
        projectRequestModel.survey = survey;
        console.log(projectRequestModel);
        return projectRequestModel;
    }

    changePage() {
        debugger;
        this.router.navigate(['management-survey']);
    }
}
