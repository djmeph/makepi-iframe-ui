import { TestBed } from '@angular/core/testing';

import { StripeCreditsService } from './stripe-credits.service';

describe('StripeCreditsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StripeCreditsService = TestBed.get(StripeCreditsService);
    expect(service).toBeTruthy();
  });
});
