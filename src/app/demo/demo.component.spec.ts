import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DemoComponent } from './demo.component';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(
    waitForAsync(() => {
      // @ts-ignore
        TestBed.configureTestingModule({
        declarations: [DemoComponent],
        imports: [FormsModule, ReactiveFormsModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('Custom switch icons should have images', () => {
    expect(
      fixture.debugElement.query(By.css('.custom-icons')).query(By.css('small')).nativeElement
        .innerHTML
    ).toContain('i');
  });
});
