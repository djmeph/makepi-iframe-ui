import { Injectable } from '@angular/core';

export enum Alerts {
    PRIMARY,
    SECONDARY,
    SUCCESS,
    DANGER,
    WARNING,
    INFO,
    LIGHT,
    DARK,
}

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    show: boolean;
    fade: boolean;
    type: Alerts;
    bold: string;
    light: string;

    constructor() {
        this.show = false;
        this.fade = true;
    }

    closeAlert() {
        this.show = false;
        setTimeout(() => {
            this.fade = false;
            this.bold = '';
            this.light = '';
            this.type = null;
            this.fade = true;
        }, 100);
    }

    openAlert(bold: string, light: string, type: Alerts) {
        this.bold = bold;
        this.light = light;
        this.type = type;
        this.fade = true;
        this.show = true;
        setTimeout(() => this.closeAlert(), 10 * 1000);
    }
}
