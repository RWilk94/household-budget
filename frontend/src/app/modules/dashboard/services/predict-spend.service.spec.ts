import { TestBed } from '@angular/core/testing';

import { PredictSpendService } from './predict-spend.service';

describe('PredictSpendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PredictSpendService = TestBed.get(PredictSpendService);
    expect(service).toBeTruthy();
  });
});
