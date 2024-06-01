import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  getData(): Observable<any>{
    return this.http.get(API + 'dashboard', 
      {
        headers: this.createAuthorizationHeader()
      }
    );
  }
}
