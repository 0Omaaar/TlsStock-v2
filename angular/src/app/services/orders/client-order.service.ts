import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserStorageService } from '../storage/user-storage.service';
import { ArticleService } from '../articles/article.service';

const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class ClientOrderService {
  private ordersCache: any[] | null = null;

  constructor(private http: HttpClient, private articleService: ArticleService) { }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + UserStorageService.getToken());
  }

  addOrder(orderClientDto: any): Observable<any> {
    return this.http
      .post(API + 'order/save', orderClientDto, {
        headers: this.createAuthorizationHeader()
      })
      .pipe(tap(() => (this.ordersCache = null, this.articleService.clearCache())));
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
      });
  }

  getOrdersByArticle(id: number): Observable<any> {
    return this.http.get(API + `article/${id}/orders`, {
      headers: this.createAuthorizationHeader()
    })
  }

  getOrder(id: number): Observable<any> {
    return this.http.get(API + 'order/' + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  autoOrderReturn(id: number): Observable<any> {
    return this.http.get(API + `return-order-auto/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  manualOrderReturn(orderDto: any): Observable<any> {
    return this.http.post(API + 'return-order-manual', orderDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  clearCache() {
    this.ordersCache = null;
  }
}
