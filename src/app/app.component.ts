import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import ResizeObserver from 'resize-observer-polyfill';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    height: number;

    constructor(
        private userService: UserService,
        private router: Router
    ) {
        if (window.addEventListener) {
            window.addEventListener('message', this.receiveMessage.bind(this), false);
        } else {
            (window as any).attachEvent('onmessage', this.receiveMessage.bind(this));
        }
        this.elementObserver();
    }

    receiveMessage(event) {
        let data;
        try {
            data = event.data === 'string' ? JSON.parse(event.data) : event.data;
            if (data.token) { this.userService.jwtToken = data.token; }
            if (data.route) { this.router.navigate([data.route]); }
        } catch (err) {}
    }

    /**
     * this will bind resize observer to the target element
     */
    elementObserver() {
        const ro = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (this.height === entry.contentRect.height) {
                    return;
                }
                this.height = entry.contentRect.height;
                window.parent.postMessage({ height: entry.contentRect.height } , '*');
            }
        });

        // Element for which to observe height and width
        ro.observe(document.body);
    }

}
