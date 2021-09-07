import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICategory } from 'src/app/shared/models/category/category.model';
import { Basket, IBasket } from 'src/app/shared/models/order/order.model';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  public userCategories: Array<ICategory> = [];
  isOpen = false;
  public basket: IBasket = new Basket();
  public ordersArray: Array<IProduct> = [];


  constructor(
    private categoryService: CategoryService,
    public sanitizer: DomSanitizer,
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.initOpenBasket();
    this.initBasket();

  }

  loadCategories(): void {
    this.categoryService.getJSONCategories().subscribe(data => {
      this.userCategories = data
    },
      err => {
        console.log(err)
      }
    )
  }

  initOpenBasket(): void {
    this.orderService.checkOpenBasket$.subscribe(data => {
      console.log(data);
      this.isOpen = !this.isOpen;
    })
  }

  openBasket(): void {
    this.orderService.checkOpenBasket$.next(true)
  }

  initBasket(): void {
    this.orderService.basket$.subscribe(data => {
      this.basket = data;
    })
  }

  addItem(productId: number): void {
    this.orderService.addToBasket(productId, 1);
  }

  removeItem(productId: number): void {
    this.orderService.removeBasketItem(productId, 1);
  }

  removeAllItems(productId: number): void {
    this.orderService.removeAllItems(productId);
  }
}
