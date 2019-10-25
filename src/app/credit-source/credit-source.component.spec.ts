import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSourceComponent } from './credit-source.component';

describe('CreditSourceComponent', () => {
  let component: CreditSourceComponent;
  let fixture: ComponentFixture<CreditSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
