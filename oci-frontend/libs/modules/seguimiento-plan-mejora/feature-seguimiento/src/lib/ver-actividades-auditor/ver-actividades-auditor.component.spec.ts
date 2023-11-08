import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerActividadesAuditorComponent } from './ver-actividades-auditor.component';

describe('VerActividadesAuditorComponent', () => {
  let component: VerActividadesAuditorComponent;
  let fixture: ComponentFixture<VerActividadesAuditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerActividadesAuditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerActividadesAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
