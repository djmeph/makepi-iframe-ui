import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
    selector: 'app-cancel-membership',
    templateUrl: './cancel-membership.component.html',
    styleUrls: ['./cancel-membership.component.scss']
})
export class CancelMembershipComponent {

    constructor(
        private router: Router,
        private userService: UserService,
    ) { }

    async yes() {
        try {
            await this.userService.cancelSubscription();
            this.router.navigate(['/membership-info']);
        } catch (err) {
            this.router.navigate(['/membership-info']);
        }
    }

    no() {
        this.router.navigate(['/membership-info']);
    }

}
