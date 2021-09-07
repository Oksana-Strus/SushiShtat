import { Component, OnInit } from '@angular/core';
import { Basket, IBasket } from 'src/app/shared/models/order/order.model';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userProducts: Array<IProduct> = [];
  public basket: IBasket = new Basket();
  constructor(
    private orderService: OrdersService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProducts()
    this.initBasketProductsCount();
  }

  openBasket(): void {
    this.orderService.checkOpenBasket$.next(true)
  }

  loadProducts(): void {
    this.productService.getJSONProducts().subscribe(data => {
      this.userProducts = data;
    },
      err => {
        console.log(err)
      }
    )
  }

  initBasketProductsCount(): void {
    this.orderService.basket$.subscribe(data => {
      this.basket = data;
    })
  }
}
