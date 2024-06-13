// Angular Import
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { UserStorageService } from './services/storage/user-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // constructor
  constructor(private router: Router,
    private authService: AuthService
  ) { }


  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }


  // life cycle event
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });


    const user = localStorage.getItem('ecom-user');
    const token = localStorage.getItem('ecom-token');

    if (token != null) {
      if (this.tokenExpired(token)) {
        console.log("Token expired !");
        this.authService.logout();
      } else {
        console.log("Token Not Expired !");
      }
    }

    if (!UserStorageService.getToken()) {
      this.authService.logout();
    }
  }
}
