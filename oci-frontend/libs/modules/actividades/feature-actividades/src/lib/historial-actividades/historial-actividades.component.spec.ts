import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialActividadesComponent } from './historial-actividades.component';

describe('HistorialActividadesComponent', () => {
  let component: HistorialActividadesComponent;
  let fixture: ComponentFixture<HistorialActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
