import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAvanceComponent } from './actualizar-avance.component';

describe('ActualizarAvanceComponent', () => {
  let component: ActualizarAvanceComponent;
  let fixture: ComponentFixture<ActualizarAvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarAvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
