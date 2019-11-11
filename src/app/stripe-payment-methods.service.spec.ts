import { TestBed } from '@angular/core/testing';

import { StripePaymentMethodsService } from './stripe-payment-methods.service';

describe('StripePaymentMethodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StripePaymentMethodsService = TestBed.get(StripePaymentMethodsService);
    expect(service).toBeTruthy();
  });
});
