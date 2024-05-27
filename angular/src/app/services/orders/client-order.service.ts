import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserStorageService } from '../storage/user-storage.service';

const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class ClientOrderService {
  private ordersCache: any[] | null = null;

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + UserStorageService.getToken());
  }

  addOrder(orderClientDto: any): Observable<any> {
    return this.http
      .post(API + 'order/save', orderClientDto, {
        headers: this.createAuthorizationHeader()
      })
      .pipe(tap(() => (this.ordersCache = null)));
  }

  updateOrder(orderClientDto: any): Observable<any> {
    return this.http
      .put(API + 'order/update', orderClientDto, {
        headers: this.createAuthorizationHeader()
      })
      .pipe(tap(() => (this.ordersCache = null)));
  }

  updateOrderStatus(orderClientDto: any): Observable<any> {
    return this.http
      .put(API + 'order/update/status', orderClientDto, {
        headers: this.createAuthorizationHeader()
      })
      .pipe(tap(() => (this.ordersCache = null)));
  }

  getOrders(): Observable<any> {
    if (this.ordersCache) {
      return of(this.ordersCache);
    }
    return this.http
      .get<any[]>(API + 'orders', {
        headers: this.createAuthorizationHeader()
      })
      .pipe(tap((data) => (this.ordersCache = data)));
  }

  getOrder(id: number): Observable<any> {
    return this.http.get(API + 'order/' + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  clearCache(){
    this.ordersCache = null;
  }
}
