import { TestBed } from '@angular/core/testing';

import { GuardIsAuthService } from './guard-is-auth.service';

describe('GuardIsAuthService', () => {
  let service: GuardIsAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardIsAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
