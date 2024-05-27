import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserStorageService } from '../storage/user-storage.service';

const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientsCache: any[] | null = null;

  constructor(private http: HttpClient
  ) {}

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  addClient(clientDto: any): Observable<any> {
    this.clientsCache = null;
    return this.http.post(API + 'client/save', clientDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getClients(): Observable<any> {
    if (this.clientsCache) {
      return of(this.clientsCache);
    } else {
      return this.http.get<any[]>(API + 'clients', {
        headers: this.createAuthorizationHeader()
      }).pipe(
        tap(clients => this.clientsCache = clients)
      );
    }
  }

  updateClient(clientDto: any): Observable<any> {
    this.clientsCache = null;
    return this.http.put(API + 'client/update', clientDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteClient(clientDto: any): Observable<any> {
    this.clientsCache = null;
    return this.http.delete(API + 'client/delete', {
      body: clientDto,
      headers: this.createAuthorizationHeader()
    });
  }

  clearCache(){
    this.clientsCache = null;
  }
}
