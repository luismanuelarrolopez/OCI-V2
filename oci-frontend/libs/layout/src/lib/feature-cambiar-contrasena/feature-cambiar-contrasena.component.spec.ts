import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCambiarContrasenaComponent } from './feature-cambiar-contrasena.component';

describe('FeatureCambiarContrasenaComponent', () => {
  let component: FeatureCambiarContrasenaComponent;
  let fixture: ComponentFixture<FeatureCambiarContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureCambiarContrasenaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureCambiarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
