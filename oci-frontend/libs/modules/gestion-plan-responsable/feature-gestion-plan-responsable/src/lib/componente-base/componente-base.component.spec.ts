import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteBaseComponent } from './componente-base.component';

describe('ComponenteBaseComponent', () => {
  let component: ComponenteBaseComponent;
  let fixture: ComponentFixture<ComponenteBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
