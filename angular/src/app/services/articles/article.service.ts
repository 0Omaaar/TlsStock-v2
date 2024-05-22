import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articlesCache: any[] | null = null;

  constructor(private http: HttpClient) {}

  addArticle(articleDto: any): Observable<any> {
    return this.http.post(API + 'article/save', articleDto).pipe(tap(() => (this.articlesCache = null)));
  }

  updateArticle(articleDto: any): Observable<any> {
    return this.http.put(API + 'article/update', articleDto).pipe(tap(() => (this.articlesCache = null)));
  }

  getArticles(): Observable<any[]> {
    if (this.articlesCache) {
      return of(this.articlesCache);
    } else {
      return this.http.get<any[]>(API + 'articles').pipe(tap((articles) => (this.articlesCache = articles)));
    }
  }

  searchArticles(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(API + 'articles/search?keyword=' + keyword);
  }

  getArticle(articleId: number): Observable<any> {
    return this.http.get(API + 'article/' + articleId);
  }

  deleteArticle(articleDto: any): Observable<any> {
    return this.http
      .delete(API + 'article/delete', {
        body: articleDto
      })
      .pipe(
        tap(() => {
          this.articlesCache = null;
        })
      );
  }
}
