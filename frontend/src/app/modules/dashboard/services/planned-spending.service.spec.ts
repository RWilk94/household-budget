import { TestBed } from '@angular/core/testing';

import { PlannedSpendingService } from './planned-spending.service';

describe('PlannedSpendingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlannedSpendingService = TestBed.get(PlannedSpendingService);
    expect(service).toBeTruthy();
  });
});
