import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPlanMejoraComponent } from './tab-plan-mejora.component';

describe('TabPlanMejoraComponent', () => {
  let component: TabPlanMejoraComponent;
  let fixture: ComponentFixture<TabPlanMejoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabPlanMejoraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPlanMejoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
