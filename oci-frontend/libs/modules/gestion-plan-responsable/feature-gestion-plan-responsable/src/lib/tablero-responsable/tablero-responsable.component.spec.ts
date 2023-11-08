import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroResponsableComponent } from './tablero-responsable.component';

describe('TableroResponsableComponent', () => {
  let component: TableroResponsableComponent;
  let fixture: ComponentFixture<TableroResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableroResponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
