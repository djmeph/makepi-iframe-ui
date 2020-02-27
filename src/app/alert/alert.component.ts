import { Component, OnInit } from '@angular/core';
import { AlertService, Alerts  } from '../alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

    alerts = Alerts;

    constructor(
        public alertService: AlertService,
    ) {}

    closeAlert() {
        this.alertService.closeAlert();
    }

}
