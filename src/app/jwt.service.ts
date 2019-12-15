import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { TokenDecoded } from './models/token-decoded';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'lodash';
import * as moment from 'moment';

const helper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class JwtService {

    constructor(
        private userService: UserService
    ) { }

    public async isAuthenticated() {
        let token = this.userService.jwtToken;
        if (!token) return false;
        let decodedToken = helper.decodeToken(`${token}`) as TokenDecoded;
        let exp = moment.unix(decodedToken.exp);
        let isTokenExpired = moment().isAfter(exp);
        if (isTokenExpired) return false;
        return !isTokenExpired;
    }
}
