import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitSourceComponent } from './debit-source.component';

describe('DebitSourceComponent', () => {
  let component: DebitSourceComponent;
  let fixture: ComponentFixture<DebitSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
