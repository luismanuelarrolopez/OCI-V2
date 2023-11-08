import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureRecuperacionContrasenaComponent } from './feature-recuperacion-contrasena.component';

describe('FeatureRecuperacionContrasenaComponent', () => {
  let component: FeatureRecuperacionContrasenaComponent;
  let fixture: ComponentFixture<FeatureRecuperacionContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureRecuperacionContrasenaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureRecuperacionContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
