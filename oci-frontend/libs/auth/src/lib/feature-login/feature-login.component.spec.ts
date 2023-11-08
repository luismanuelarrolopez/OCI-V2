import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureLoginComponent } from './feature-login.component';

describe('FeatureLoginComponent', () => {
  let component: FeatureLoginComponent;
  let fixture: ComponentFixture<FeatureLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureLoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
