import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesosPmiComponent } from './procesos-pmi.component';

describe('ProcesosPmiComponent', () => {
  let component: ProcesosPmiComponent;
  let fixture: ComponentFixture<ProcesosPmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesosPmiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesosPmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
