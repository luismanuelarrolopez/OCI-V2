import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAccionesComponent } from './historial-acciones.component';

describe('HistorialAccionesComponent', () => {
  let component: HistorialAccionesComponent;
  let fixture: ComponentFixture<HistorialAccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialAccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
