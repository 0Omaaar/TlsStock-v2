import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../storage/user-storage.service';
import { Observable } from 'rxjs';

const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class SousCategoryService {

  constructor(private http: HttpClient) { }

  getSousCategories(): Observable<any[]>{
    return this.http.get<any[]>(API + 'sousCategories', {
      headers: this.createAuthorizationHeader()
    })
  }

  addSousCategory(sousCategoryDto: any): Observable<any>{
    return this.http.post(API + 'saveSousCategory', sousCategoryDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  deleteSousCategory(sousCategoryDto: any): Observable<any>{
    return this.http.delete(API + 'deleteSousCategory', {
      body: sousCategoryDto, 
      headers: this.createAuthorizationHeader()
    });
  }


  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
