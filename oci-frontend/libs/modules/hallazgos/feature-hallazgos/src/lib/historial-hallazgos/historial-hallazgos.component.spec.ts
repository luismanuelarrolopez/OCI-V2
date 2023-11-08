import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialHallazgosComponent } from './historial-hallazgos.component';

describe('HistorialHallazgosComponent', () => {
  let component: HistorialHallazgosComponent;
  let fixture: ComponentFixture<HistorialHallazgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialHallazgosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialHallazgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
