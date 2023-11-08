import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPmComponent } from './control-pm.component';

describe('ControlPmComponent', () => {
  let component: ControlPmComponent;
  let fixture: ComponentFixture<ControlPmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlPmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
