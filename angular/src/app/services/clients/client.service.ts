import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  addClient(clientDto: any): Observable<any>{
    return this.http.post(API + 'client/save', clientDto);
  }

  getClients(): Observable<any>{
    return this.http.get(API + 'clients');
  }

  updateClient(clientDto: any): Observable<any>{
    return this.http.put(API + 'client/update', clientDto);
  }

  deleteClient(clientDto: any): Observable<any>{
    return this.http.delete(API + 'client/delete', {
      body: clientDto
    });
  }
}
