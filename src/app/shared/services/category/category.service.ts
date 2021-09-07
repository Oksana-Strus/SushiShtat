import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../models/category/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string = 'http://localhost:3000/';

  private api = {
    categories: `${this.url}categories`
  };

  constructor(
    private http: HttpClient
  ) { }

  getJSONCategories(): Observable<any> {
    return this.http.get<any>(this.api.categories)
  }

  getOneJSONCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.api.categories}/${id}`)
  }

  createJSONCategory(category: ICategory): Observable<any> {
    return this.http.post<any>(this.api.categories, category);
  }

  deleteJSONCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api.categories}/${id}`);
  }

  updateJSONCategory(category: ICategory, id: number): Observable<any> {
    return this.http.patch<any>(`${this.api.categories}/${id}`, category);
  }
}
