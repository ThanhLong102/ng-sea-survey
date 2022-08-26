import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subject, Subscription} from 'rxjs';
import {User} from '../../model/user';
import {NgxSurveyComponent} from '../../../../projects/ngx-surveys/src/lib/ngx-survey.component';
import {FormSection} from '../../../../projects/ngx-surveys/src/lib/form-item';
import {NgxSurveyService} from '../../../../projects/ngx-surveys/src/lib/ngx-survey.service';
import {SurveyService} from '../../service/survey.service';
import {DataSource, QuestionType, SurveySchemaModel} from '../../model/surveySchema.model';
import objectMapper from 'object-mapper';
import {ProjectRequestModel} from '../../model/projectRequest.model';
import {ProjectModeEnum} from '../../model/projectModeEnum';


@Component({
    selector: 'app-create-survey',
    templateUrl: './create-survey.component.html',
    styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent implements OnInit, OnDestroy, AfterViewInit {
    // Form survey
    @ViewChild('survey', {static: false}) public survey: NgxSurveyComponent;
    public form: any[] = [];
    public model = {};
    // Data
    dataSource = new MatTableDataSource<User>();
    partnerCodes = new Array('');
    statusAgents = ['', 0, 1];

    curPartnerCode = '';
    curPartnerName = '';
    curStatusAgent = '';
    // Table
    positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
    position = new FormControl(this.positionOptions[2]);
    displayedColumns = ['indexRow', 'code', 'name', 'position', 'place', 'email', 'actions'];
    totalRecords = 0;
    pageSize = 10;
    pageSizeOptions = [10, 20, 50];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    unsubscribe = new Subject();

    // Survey
    private fileUpoadSubscription: Subscription;
    id = 'KcGr7R';

    // Dependency Injection
    constructor(surveyService: NgxSurveyService, private surveyServiceModel: SurveyService) {
        this.fileUpoadSubscription = surveyService.onFilesSelected.subscribe(files => {
            const request = {basePath: this.id, file: files[0].file, storageType: 2};
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

    ngOnInit(): void {
        this.initFormCurrent(this.id);
        this.getAllComboBox();
        this.loadFirstData();
        this.editPage();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }

    editPage() {
        const paginatorIntl = this.paginator._intl;
        paginatorIntl.nextPageLabel = 'trang tiếp';
        paginatorIntl.previousPageLabel = 'trang trước';
        paginatorIntl.lastPageLabel = 'trang cuối';
        paginatorIntl.firstPageLabel = 'trang đầu';
    }

    getAllComboBox() {
    }

    loadFirstData(resetPage?: boolean) {
        const body = {
            currentPage: 1,
            pageSize: 10,
            firstPage: true,
            resetPage
        };
        this.getAllComboBox();
        this.searchBase(body);
    }

    onSearchClick() {
        // this.doFilter(this.curPartnerName);
        const body = {
            currentPage: 0,
            pageSize: this.pageSize,
            partnerCode: this.curPartnerCode,
            partnerName: (this.curPartnerName !== '') ? this.curPartnerName.trim() : this.curPartnerName,
            statusAgent: this.curStatusAgent,
            firstPage: true
        };
        this.curPartnerName = (this.curPartnerName !== '') ? this.curPartnerName.trim() : this.curPartnerName;
        this.searchBase(body);
    }

    changePage(event: any) {
        const body = {
            currentPage: event.pageIndex + 1,
            pageSize: event.pageSize,
            partnerCode: this.curPartnerCode,
            partnerName: (this.curPartnerName !== '') ? this.curPartnerName.trim() : this.curPartnerName,
            statusAgent: this.curStatusAgent,
        };
        this.searchBase(body);
    }

    searchBase(body) {
    }

    doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    };

    openAddDialog() {
    }

    openEditDialog(element) {
    }


    onDeleteElement(element) {
    }

    addSection(): void {
        this.form.push(<FormSection>{});
    }

    onChange(value) {
        this.model = value;
        console.log(value);
        this.survey.value = this.model;
    }

    initFormCurrent(id) {
        this.surveyServiceModel.getProject(id).subscribe(project => {
                console.log(project);
                this.form = project.data.survey?.children;
                for (let i = 0; i < this.form.length; i++) {
                    for (let j = 0; j < this.form[i]?.children.length; j++) {
                        if (this.form[i].children[j].type === QuestionType.Radio) {
                            const map = {
                                'label': 'label',
                                'value': 'optionValue'
                            };
                            this.form[i].children[j].children = [];
                            for (let k = 0; k < this.form[i].children[j].dataSource?.length; k++) {
                                const dest = objectMapper(this.form[i].children[j].dataSource[k], map);
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
        const map = {
            'id': 'id',
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

        // Map
        const surveys: SurveySchemaModel[] = [];
        this.survey?.value?.forEach(v => {
            // tslint:disable-next-line:no-shadowed-variable
            const survey = new SurveySchemaModel();
            survey.id = Math.random().toString(36).slice(2, 7);
            survey.title = v.title;
            survey.type = v.type;

            const children: SurveySchemaModel[] = [];
            v?.children.forEach(c => {
                const dest = objectMapper(c, map);

                const dataSources: DataSource[] = [];
                if (dest.type === 'radio') {
                    for (let i = 0; i < c.children.length; i++) {
                        const dataSource = new DataSource();
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
        const projectRequestModel = new ProjectRequestModel();
        const survey = new SurveySchemaModel();
        survey.id = Math.random().toString(36).slice(2, 8);
        survey.type = QuestionType.Survey;
        survey.children = surveys;
        projectRequestModel.name = 'Survey';
        projectRequestModel.mode = ProjectModeEnum.survey;
        projectRequestModel.survey = survey;
        console.log(projectRequestModel);
        return projectRequestModel;
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

    ngOnDestroy() {
        this.fileUpoadSubscription.unsubscribe();
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
