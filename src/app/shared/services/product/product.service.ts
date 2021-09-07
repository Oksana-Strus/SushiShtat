import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = 'http://localhost:3000/';
  private api = {
    products: `${this.url}products`
  };
  constructor(
    private http: HttpClient
  ) { }


  getJSONProducts(): Observable<any> {
    return this.http.get<any>(this.api.products)
  }

  getOneJSONProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.api.products}/${id}`)
  }

  createJSONProduct(category: IProduct): Observable<any> {
    return this.http.post<any>(this.api.products, category);
  }

  deleteJSONProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api.products}/${id}`);
  }

  updateJSONProduct(category: IProduct, id: number): Observable<any> {
    return this.http.patch<any>(`${this.api.products}/${id}`, category);
  }
}
