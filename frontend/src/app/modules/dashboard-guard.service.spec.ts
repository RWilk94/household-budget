import {TestBed, inject} from '@angular/core/testing';

import {DashboardGuardService} from './dashboard-guard.service';

describe('DashboardGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardGuardService]
    });
  });

  it('should be created', inject([DashboardGuardService], (service: DashboardGuardService) => {
    expect(service).toBeTruthy();
  }));
});
