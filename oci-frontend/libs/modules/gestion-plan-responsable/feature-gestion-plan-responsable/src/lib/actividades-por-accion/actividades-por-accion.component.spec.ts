import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesPorAccionComponent } from './actividades-por-accion.component';

describe('ActividadesPorAccionComponent', () => {
  let component: ActividadesPorAccionComponent;
  let fixture: ComponentFixture<ActividadesPorAccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesPorAccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesPorAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
