import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
import { Router } from '@angular/router';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth: boolean = false;
  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService,
    private router: Router
  ) { }

  register(signupRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + 'sign-up', signupRequest);
  }

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username, password };

    return this.http.post<HttpResponse<any>>(BASIC_URL + 'authenticate', body, { headers, observe: 'response' }).pipe(
      map((res) => {
        const authHeader = res.headers.get('authorization');
        if (authHeader) {
          const token = authHeader.substring(7);
          const user = res.body;
          if (token && user) {
            this.userStorageService.saveToken(token);
            this.userStorageService.saveUser(user);
            this.isAuth = true;
            return true;
          }
        }
        return false;
      })
    );
  }

  getOrderByTrackingId(trackingID: number): Observable<any> {
    return this.http.get(BASIC_URL + `order/${trackingID}`);
  }

  logout() {
    localStorage.removeItem('ecom-user');
    localStorage.removeItem('ecom-token');

    this.router.navigateByUrl('login');
  }
}
