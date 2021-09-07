import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Basket, IBasket, IOrder } from '../../models/order/order.model';
import { IProduct } from '../../models/product/product.model';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  checkOpenBasket$ = new Subject<boolean>();
  private basket = new Basket();
  basket$ = new BehaviorSubject<IBasket>(this.basket);

  private url: string = 'http://localhost:3000/';
  private api = {
    orders: `${this.url}orders`
  }

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {
    this.basket$.next(this.basket)
  }

  get(): Observable<any> {
    return this.http.get<any>(this.api.orders);
  }

  create(order: any): Observable<any> {
    return this.http.post<any>(this.api.orders, order);
  }

  addToBasket(productId: number, quantity: number) {
    this.productService.getOneJSONProduct(productId).subscribe(data => {
      let product: IProduct = data;
      this.basket.addProductToBasket(product, quantity)
      this.basket$.next(this.basket)
    },
      err => {
        console.log(err)
      }
    )
  }

  removeBasketItem(productId: number, quantity: number) {
    this.basket.removeBasketItem(productId, quantity)

    this.basket$.next(this.basket)
  }

  removeAllItems(productId: number) {
    this.basket.removeAllItems(productId)

    this.basket$.next(this.basket)
  }

}

