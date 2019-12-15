import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipInfoService } from '../membership-info.service';
import { Pages } from '../models/pages';

@Component({
    selector: 'app-membership-info',
    templateUrl: './membership-info.component.html',
    styleUrls: ['./membership-info.component.scss']
})
export class MembershipInfoComponent implements AfterViewInit {

    pages = Pages;
    membership: any;

    constructor(
        private router: Router,
        private membershipInfoService: MembershipInfoService,
    ) { }

    async ngAfterViewInit() {
        this.membership = await this.membershipInfoService.getMembershipInfo();
    }

    switchTab(view: string) {
        this.router.navigate([view]);
    }

}
