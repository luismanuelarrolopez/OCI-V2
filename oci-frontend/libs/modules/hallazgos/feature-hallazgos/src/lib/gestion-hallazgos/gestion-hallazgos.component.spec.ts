import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionHallazgosComponent } from './gestion-hallazgos.component';

describe('GestionHallazgosComponent', () => {
  let component: GestionHallazgosComponent;
  let fixture: ComponentFixture<GestionHallazgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionHallazgosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionHallazgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
