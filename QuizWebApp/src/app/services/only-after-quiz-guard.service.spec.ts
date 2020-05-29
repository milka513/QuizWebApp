import { TestBed } from '@angular/core/testing';

import { OnlyAfterQuizGuardService } from './only-after-quiz-guard.service';

describe('OnlyAfterQuizGuardService', () => {
  let service: OnlyAfterQuizGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlyAfterQuizGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
