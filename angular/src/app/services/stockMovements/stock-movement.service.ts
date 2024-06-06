import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserStorageService } from '../storage/user-storage.service';
import { ArticleService } from '../articles/article.service';

const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class StockMovementService {

  private stocksCache: any[] | null = null;

  constructor(private http: HttpClient, private articleService: ArticleService) { }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  getArticlesStock(): Observable<any[]> {
    return this.http.get<any[]>(API + 'articles', {
      headers: this.createAuthorizationHeader()
    });
  }

  correctionStock(stockMovementDto: any): Observable<any> {
    this.stocksCache = null;
    return this.http.post(API + 'correct-stock', stockMovementDto, {
      headers: this.createAuthorizationHeader()
    })
      ;
  }

  clearCache() {
    this.stocksCache = null;
  }
}
