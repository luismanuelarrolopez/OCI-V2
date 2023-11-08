import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPlanDialogComponent } from './control-plan-dialog.component';

describe('ControlPlanDialogComponent', () => {
  let component: ControlPlanDialogComponent;
  let fixture: ComponentFixture<ControlPlanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlPlanDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
