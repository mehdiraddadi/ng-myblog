import { TestBed } from '@angular/core/testing';

import { GuardIsAdmin } from './guard-is-admin';

describe('GuardIsAdminService', () => {
  let service: GuardIsAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardIsAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
