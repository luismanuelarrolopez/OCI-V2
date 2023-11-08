import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaLiderComponent } from './tabla-lider.component';

describe('TablaLiderComponent', () => {
  let component: TablaLiderComponent;
  let fixture: ComponentFixture<TablaLiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaLiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaLiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
