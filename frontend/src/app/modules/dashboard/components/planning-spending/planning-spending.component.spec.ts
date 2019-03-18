import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningSpendingComponent } from './planning-spending.component';

describe('PlanningSpendingComponent', () => {
  let component: PlanningSpendingComponent;
  let fixture: ComponentFixture<PlanningSpendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningSpendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningSpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
