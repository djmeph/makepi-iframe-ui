import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDepositsComponent } from './verify-deposits.component';

describe('VerifyDepositsComponent', () => {
    let component: VerifyDepositsComponent;
    let fixture: ComponentFixture<VerifyDepositsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ VerifyDepositsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VerifyDepositsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
