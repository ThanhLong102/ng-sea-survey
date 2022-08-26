import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLinkComponent } from './dialog-link.component';

describe('DialogLinkComponent', () => {
  let component: DialogLinkComponent;
  let fixture: ComponentFixture<DialogLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
