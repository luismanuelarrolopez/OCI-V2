import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCausasComponent } from './gestion-causas.component';

describe('GestionCausasComponent', () => {
  let component: GestionCausasComponent;
  let fixture: ComponentFixture<GestionCausasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionCausasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCausasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
