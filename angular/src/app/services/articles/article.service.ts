import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  addArticle(articleDto: any): Observable<any> {
    return this.http.post(API + 'article/save', articleDto);
  }

  updateArticle(articleDto: any): Observable<any>{
    return this.http.put(API + 'article/update', articleDto);
  }

  getArticles(): Observable<any> {
    return this.http.get(API + `articles`);
  }

  searchArticles(keyword: string): Observable<any> {
    return this.http.get(API + 'articles/search?keyword=' + keyword);
  }

  getArticle(articleId: number): Observable<any> {
    return this.http.get(API + 'article/' + articleId);
  }

  deleteArticle(articleDto: any): Observable<any> {
    return this.http.delete(API + 'article/delete', {
      body: articleDto
    });
  }
}
