import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionResponsablesComponent } from './gestion-responsables.component';

describe('GestionResponsablesComponent', () => {
  let component: GestionResponsablesComponent;
  let fixture: ComponentFixture<GestionResponsablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionResponsablesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionResponsablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
