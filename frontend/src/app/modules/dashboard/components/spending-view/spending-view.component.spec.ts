import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingViewComponent } from './spending-view.component';

describe('SpendingViewComponent', () => {
  let component: SpendingViewComponent;
  let fixture: ComponentFixture<SpendingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
