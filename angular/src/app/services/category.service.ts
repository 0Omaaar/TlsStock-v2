import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get(API + 'categories');
  }

  getCategoriesByName(name: string): Observable<any>{
    return this.http.get(API + 'categories/search?name='+name);
  }

  getArticlesByCategoryId(id: number): Observable<any>{
    return this.http.get(API + `categorie/${id}`);
  }

  addCategorie(CategorieDto: any): Observable<any> {
    return this.http.post(API + 'saveCategory', CategorieDto);
  }

  updateCategorie(CategorieDto: any): Observable<any> {
    return this.http.put(API + 'updateCategory', CategorieDto);
  }

  deleteCategory(categoryDto: any): Observable<any>{
    return this.http.delete(API + 'deleteCategory', {
      body: categoryDto
    });
  }
}
