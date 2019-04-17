import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictSpendComponent } from './predict-spend.component';

describe('PredictSpendComponent', () => {
  let component: PredictSpendComponent;
  let fixture: ComponentFixture<PredictSpendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictSpendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictSpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
