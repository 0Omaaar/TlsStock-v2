import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientsCache: any[] | null = null;

  constructor(private http: HttpClient) {}

  addClient(clientDto: any): Observable<any> {
    this.clientsCache = null;
    return this.http.post(API + 'client/save', clientDto);
  }

  getClients(): Observable<any> {
    if (this.clientsCache) {
      return of(this.clientsCache);
    } else {
      return this.http.get<any[]>(API + 'clients').pipe(
        tap(clients => this.clientsCache = clients)
      );
    }
  }

  updateClient(clientDto: any): Observable<any> {
    this.clientsCache = null;
    return this.http.put(API + 'client/update', clientDto);
  }

  deleteClient(clientDto: any): Observable<any> {
    this.clientsCache = null;
    return this.http.delete(API + 'client/delete', {
      body: clientDto
    });
  }
}
