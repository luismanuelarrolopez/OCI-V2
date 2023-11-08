import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentajeGraficoComponent } from './porcentaje-grafico.component';

describe('PorcentajeGraficoComponent', () => {
  let component: PorcentajeGraficoComponent;
  let fixture: ComponentFixture<PorcentajeGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorcentajeGraficoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorcentajeGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
