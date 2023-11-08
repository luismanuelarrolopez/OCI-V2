import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculoGraficoComponent } from './circulo-grafico.component';

describe('CirculoGraficoComponent', () => {
  let component: CirculoGraficoComponent;
  let fixture: ComponentFixture<CirculoGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirculoGraficoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirculoGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
