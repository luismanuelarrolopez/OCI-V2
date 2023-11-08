import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluarEvidenciaComponent } from './evaluar-evidencia.component';

describe('EvaluarEvidenciaComponent', () => {
  let component: EvaluarEvidenciaComponent;
  let fixture: ComponentFixture<EvaluarEvidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluarEvidenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluarEvidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
