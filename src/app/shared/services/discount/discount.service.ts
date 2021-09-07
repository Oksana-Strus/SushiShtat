import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDiscount } from '../../models/discount/discount.model';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private url: string = 'http://localhost:3000/';
  private api = {
    discounts: `${this.url}discounts`
  };
  constructor(
    private http: HttpClient
  ) { }
  
  getJSONDiscount(): Observable<any> {
    return this.http.get<any>(this.api.discounts)
  }

  getOneJSONDiscount(id: number): Observable<any> {
    return this.http.get<any>(`${this.api.discounts}/${id}`)
  }

  createJSONSDiscount(discount: IDiscount): Observable<any> {
    return this.http.post<any>(this.api.discounts, discount);
  }

  deleteJSONDiscount(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api.discounts}/${id}`);
  }

  updateJSONDiscount(discount: IDiscount, id: number): Observable<any> {
    return this.http.patch<any>(`${this.api.discounts}/${id}`, discount)
  }
}
