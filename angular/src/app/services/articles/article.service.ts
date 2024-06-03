import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserStorageService } from '../storage/user-storage.service';

const API = 'http://localhost:8080/api/';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articlesCache: any[] | null = null;

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  addArticle(articleDto: any): Observable<any> {
    return this.http.post(API + 'article/save', articleDto, {
      headers: this.createAuthorizationHeader()
    }).pipe(tap(() => (this.articlesCache = null)));
  }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(API + 'article/upload', formData, {
      headers: this.createAuthorizationHeader(),
      responseType: 'text'
    });
  }

  updateArticle(articleDto: any): Observable<any> {
    return this.http.put(API + 'article/update', articleDto, {
      headers: this.createAuthorizationHeader()
    }).pipe(tap(() => (this.articlesCache = null)));
  }

  getArticles(): Observable<any[]> {
    if (this.articlesCache) {
      return of(this.articlesCache);
    } else {
      return this.http.get<any[]>(API + 'articles', {
        headers: this.createAuthorizationHeader()
      });
    }
  }

  searchArticles(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(API + 'articles/search?keyword=' + keyword);
  }

  getArticle(articleId: number): Observable<any> {
    return this.http.get(API + 'article/' + articleId, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteArticle(articleDto: any): Observable<any> {
    return this.http
      .delete(API + 'article/delete', {
        body: articleDto,
        headers: this.createAuthorizationHeader()
      })
      .pipe(
        tap(() => {
          this.articlesCache = null;
        })
      );
  }

  clearCache(){
    this.articlesCache = null;
  }
}
