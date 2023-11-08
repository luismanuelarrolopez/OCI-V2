import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoAuditorComponent } from './seguimiento-auditor.component';

describe('SeguimientoAuditorComponent', () => {
  let component: SeguimientoAuditorComponent;
  let fixture: ComponentFixture<SeguimientoAuditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoAuditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
