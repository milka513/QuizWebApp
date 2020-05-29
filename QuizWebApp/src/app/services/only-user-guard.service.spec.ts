import { TestBed } from '@angular/core/testing';

import { OnlyUserGuardService } from './only-user-guard.service';

describe('OnlyUserGuardService', () => {
  let service: OnlyUserGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlyUserGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
