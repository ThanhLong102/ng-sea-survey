import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSurveyComponent } from './report-survey.component';

describe('ReportSurveyComponent', () => {
  let component: ReportSurveyComponent;
  let fixture: ComponentFixture<ReportSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
