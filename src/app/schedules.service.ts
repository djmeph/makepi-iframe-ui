import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

export enum ScheduleStatuses {
    UNPAID,
    PAID,
    LATE,
    CANCELLED,
}

@Injectable({
    providedIn: 'root'
})
export class SchedulesService {

    constructor(
        private globalService: GlobalService,
        private http: HttpClient,
    ) {}

    public getByStatus(status: ScheduleStatuses): Promise<any> {
        return this.http
        .get(`${this.globalService.uri}/schedules/${status}`)
        .toPromise();
    }
}
