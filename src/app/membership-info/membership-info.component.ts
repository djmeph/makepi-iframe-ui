import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipInfoService } from '../membership-info.service';
import { Pages } from '../models/pages';

export enum State {
    AUTHORIZED = 200,
    UNAUTHORIZED = 403,
    ERROR = 500,
    NOT_FOUND = 404,
}

@Component({
    selector: 'app-membership-info',
    templateUrl: './membership-info.component.html',
    styleUrls: ['./membership-info.component.scss']
})
export class MembershipInfoComponent implements AfterViewInit, OnInit {
    AUTHORIZED = State.AUTHORIZED;
    UNAUTHORIZED = State.UNAUTHORIZED;
    ERROR = State.ERROR;
    NOT_FOUND = State.NOT_FOUND;

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
            this.state = State.AUTHORIZED;
        } catch (err) {
            this.loading = false;
            switch (err.status) {
                case State.UNAUTHORIZED:
                    this.state = State.UNAUTHORIZED;
                    break;
                case State.NOT_FOUND:
                    this.membership = null;
                    this.state = State.NOT_FOUND;
                    break;
                default:
                    this.state = State.ERROR;
            }
        }
    }

    switchTab(view: string) {
        this.router.navigate([view]);
    }

}
