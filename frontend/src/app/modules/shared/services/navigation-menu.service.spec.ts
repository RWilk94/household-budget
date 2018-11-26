import { TestBed, inject } from '@angular/core/testing';

import { NavigationMenuService } from './navigation-menu.service';

describe('NavigationMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationMenuService]
    });
  });

  it('should be created', inject([NavigationMenuService], (service: NavigationMenuService) => {
    expect(service).toBeTruthy();
  }));
});
