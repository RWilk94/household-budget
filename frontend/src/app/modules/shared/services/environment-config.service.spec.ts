import { TestBed } from '@angular/core/testing';

import { EnvironmentConfigService } from './environment-config.service';

describe('EnvironmentConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnvironmentConfigService = TestBed.get(EnvironmentConfigService);
    expect(service).toBeTruthy();
  });
});
