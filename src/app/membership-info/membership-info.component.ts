import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipInfoService } from '../membership-info.service';
import { Pages } from '../models/pages';

@Component({
    selector: 'app-membership-info',
    templateUrl: './membership-info.component.html',
    styleUrls: ['./membership-info.component.scss']
})
export class MembershipInfoComponent implements AfterViewInit, OnInit {

    pages = Pages;
    membership: any;
    loading = false;

    constructor(
        private router: Router,
        private membershipInfoService: MembershipInfoService,
    ) { }

    ngOnInit() {
        this.loading = true;
    }

    async ngAfterViewInit() {
        this.loading = true;
        this.membership = await this.membershipInfoService.getMembershipInfo();
        this.loading = false;
    }

    switchTab(view: string) {
        this.router.navigate([view]);
    }

}
