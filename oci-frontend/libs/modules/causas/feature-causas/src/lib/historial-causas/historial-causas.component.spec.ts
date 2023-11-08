import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCausasComponent } from './historial-causas.component';

describe('HistorialCausasComponent', () => {
  let component: HistorialCausasComponent;
  let fixture: ComponentFixture<HistorialCausasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialCausasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCausasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
