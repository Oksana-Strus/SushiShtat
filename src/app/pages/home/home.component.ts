import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICategory } from 'src/app/shared/models/category/category.model';
import { IDiscount } from 'src/app/shared/models/discount/discount.model';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public userCategories: Array<ICategory> = [];
  public userDiscounts: Array<IDiscount> = [];
  public userProducts: Array<IProduct> = [];
  public summaryCount:number = 0;

  constructor(
    private categoryService: CategoryService,
    private discountService: DiscountService,
    public sanitizer: DomSanitizer,
    private productService: ProductService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadDiscounts();
    this.loadProducts();
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

  loadDiscounts(): void {
    this.discountService.getJSONDiscount().subscribe(data => {
      this.userDiscounts = data
    },
      err => {
        console.log(err)
      }
    )
  }

  loadProducts(): void {
    this.productService.getJSONProducts().subscribe(data => {
      this.userProducts = data
    },
      err => {
        console.log(err)
      }
    )
  }

  getProductsForCategory(categoryId?: number): Array<IProduct> {
    return this.userProducts.filter(p => p.categoryId == categoryId)
  }

  addToBasket(product: IProduct): void {
    this.ordersService.addToBasket(product.id!, 1);
    console.log(product.price)
    this.summaryCount += product.price
    console.log(this.summaryCount)
  }
}
