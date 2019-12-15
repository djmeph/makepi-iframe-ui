import { TestBed } from '@angular/core/testing';

import { MembershipInfoService } from './membership-info.service';

describe('MembershipInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MembershipInfoService = TestBed.get(MembershipInfoService);
    expect(service).toBeTruthy();
  });
});
