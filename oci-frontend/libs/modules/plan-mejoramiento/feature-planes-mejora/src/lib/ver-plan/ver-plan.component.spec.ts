import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPlanComponent } from './ver-plan.component';

describe('VerPlanComponent', () => {
  let component: VerPlanComponent;
  let fixture: ComponentFixture<VerPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
