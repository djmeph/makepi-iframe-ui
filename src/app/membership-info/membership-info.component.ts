import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pages } from '../models/pages';

@Component({
    selector: 'app-membership-info',
    templateUrl: './membership-info.component.html',
    styleUrls: ['./membership-info.component.scss']
})
export class MembershipInfoComponent implements OnInit {

    pages = Pages;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    switchTab(view: string) {
        this.router.navigate([view]);
    }

}
