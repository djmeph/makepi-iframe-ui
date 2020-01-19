import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipInfoService } from '../membership-info.service';
import { Pages } from '../models/pages';

export enum State {
    authorized = 200,
    unauthorized = 403,
    error = 500,
}

@Component({
    selector: 'app-membership-info',
    templateUrl: './membership-info.component.html',
    styleUrls: ['./membership-info.component.scss']
})
export class MembershipInfoComponent implements AfterViewInit, OnInit {
    AUTHORIZED = State.authorized;
    UNAUTHORIZED = State.unauthorized;
    ERROR = State.error;

    pages = Pages;
    membership: any;
    loading = false;
    state: State;

    constructor(
        private router: Router,
        private membershipInfoService: MembershipInfoService,
    ) {}

    ngOnInit() {
        this.loading = true;
    }

    async ngAfterViewInit() {
        this.loading = true;
        try {
            this.membership = await this.membershipInfoService.getMembershipInfo();
            this.loading = false;
            this.state = State.authorized;
        } catch (err) {
            this.loading = false;
            switch (err.status) {
                case State.unauthorized:
                    this.state = State.unauthorized;
                    break;
                default:
                    this.state = State.error;
            }
        }
    }

    switchTab(view: string) {
        this.router.navigate([view]);
    }

}
