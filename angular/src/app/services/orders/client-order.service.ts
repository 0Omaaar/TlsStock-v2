import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class ClientOrderService {

  constructor(private http: HttpClient) { }

  addOrder(orderClientDto: any): Observable<any>{
    return this.http.post(API + 'order/save', orderClientDto);
  }

  getOrders(): Observable<any>{
    return this.http.get(API + 'orders');
  }
}
