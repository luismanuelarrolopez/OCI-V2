import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoIndividualComponent } from './proceso-individual.component';

describe('ProcesoIndividualComponent', () => {
  let component: ProcesoIndividualComponent;
  let fixture: ComponentFixture<ProcesoIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
