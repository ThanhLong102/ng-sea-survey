import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgxSurveyComponent} from '../../../../projects/ngx-surveys/src/lib/ngx-survey.component';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../model/user';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-report-survey',
  templateUrl: './report-survey.component.html',
  styleUrls: ['./report-survey.component.scss']
})
export class ReportSurveyComponent implements OnInit, OnDestroy, AfterViewInit {
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
    displayedColumns = ['indexRow', 'partnerCode', 'partnerName', 'statusAgent', 'actions'];
    totalRecords = 0;
    pageSize = 10;
    pageSizeOptions = [10, 20, 50];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    unsubscribe = new Subject();

    // Dependency Injection
    constructor() {
    }

    ngOnInit(): void {
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
    }

    openAddDialog() {
    }

    openEditDialog(element) {
    }


    onDeleteElement(element) {
    }

    onChange(value) {
        this.model = value;
        console.log(value);
        this.survey.value = this.model;
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
