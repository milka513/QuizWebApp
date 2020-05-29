import { TestBed } from '@angular/core/testing';

import { OnlyAdminGuardService } from './only-admin-guard.service';

describe('OnlyAdminGuardService', () => {
  let service: OnlyAdminGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlyAdminGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
