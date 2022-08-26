import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private router: Router) {
    }

    menus = [{id: 1, name: 'Thêm mới survey', url: 'create-survey'}, {id: 2, name: 'Quản lý survey', url: 'management-survey'}, {
        id: 3,
        name: 'Báo cáo survey',
        url: 'report-survey'
    }];

    ngOnInit(): void {
    }

    changePage(url) {
        this.router.navigate([url]);
    }

}
