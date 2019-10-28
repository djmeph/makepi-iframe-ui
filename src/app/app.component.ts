import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    if (window.addEventListener) {
      window.addEventListener("message", this.receiveMessage.bind(this), false);
    } else {
       (<any>window).attachEvent("onmessage", this.receiveMessage.bind(this));
    }
  }

  receiveMessage(event) {
    let data;
    try {
      data = event.data === 'string' ? JSON.parse(event.data) : event.data;
      if (data.token) this.userService.jwtToken = data.token;
      if (data.route) this.router.navigate([data.route]);
    } catch (err) {}
  }

}
