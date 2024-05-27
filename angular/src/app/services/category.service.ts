import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserStorageService } from './storage/user-storage.service';

const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesCache: any[] | null = null;
  private categoriesByNameCache: { [name: string]: any } = {};
  private articlesByCategoryIdCache: { [id: number]: any } = {};

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  getAllCategories(): Observable<any> {
    if (this.categoriesCache) {
      return of(this.categoriesCache);
    } else {
      return this.http.get<any[]>(API + 'categories', {
        headers: this.createAuthorizationHeader()
      }).pipe(
        tap(categories => this.categoriesCache = categories)
      );
    }
  }

  getCategoriesByName(name: string): Observable<any> {
    if (this.categoriesByNameCache[name]) {
      return of(this.categoriesByNameCache[name]);
    } else {
      return this.http.get<any[]>(API + 'categories/search?name=' + name, {
        headers: this.createAuthorizationHeader()
      }).pipe(
        tap(categories => this.categoriesByNameCache[name] = categories)
      );
    }
  }

  getArticlesByCategoryId(id: number): Observable<any> {
    if (this.articlesByCategoryIdCache[id]) {
      return of(this.articlesByCategoryIdCache[id]);
    } else {
      return this.http.get<any[]>(API + `categorie/${id}`, {
        headers: this.createAuthorizationHeader()
      }).pipe(
        tap(articles => this.articlesByCategoryIdCache[id] = articles)
      );
    }
  }

  addCategorie(CategorieDto: any): Observable<any> {
    this.invalidateCache();
    return this.http.post(API + 'saveCategory', CategorieDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateCategorie(CategorieDto: any): Observable<any> {
    this.invalidateCache();
    return this.http.put(API + 'updateCategory', CategorieDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteCategory(categoryDto: any): Observable<any> {
    this.invalidateCache();
    return this.http.delete(API + 'deleteCategory', {
      body: categoryDto,
      headers: this.createAuthorizationHeader()
    });
  }

  invalidateCache() {
    this.categoriesCache = null;
    this.categoriesByNameCache = {};
    this.articlesByCategoryIdCache = {};
  }
}
