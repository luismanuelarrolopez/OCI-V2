import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastelGraficoComponent } from './pastel-grafico.component';

describe('PastelGraficoComponent', () => {
  let component: PastelGraficoComponent;
  let fixture: ComponentFixture<PastelGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastelGraficoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastelGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
