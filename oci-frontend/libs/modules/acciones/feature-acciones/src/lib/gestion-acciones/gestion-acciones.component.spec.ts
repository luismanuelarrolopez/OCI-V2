import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAccionesComponent } from './gestion-acciones.component';

describe('GestionAccionesComponent', () => {
  let component: GestionAccionesComponent;
  let fixture: ComponentFixture<GestionAccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionAccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
