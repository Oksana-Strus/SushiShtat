import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/shared/models/category/category.model';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  category?: ICategory;
  products: IProduct[] = []

  constructor(private activateRoute: ActivatedRoute, private categoryService: CategoryService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      let categoryId = this.activateRoute.snapshot.params['categoryId'];

      this.loadCategory(categoryId);
      this.loadProducts(categoryId);
    });
  }

  loadCategory(categoryId: number): void {
    this.categoryService.getOneJSONCategory(categoryId).subscribe(data => {
      this.category = data
    },
      err => {
        console.log(err)
      }
    )
  }

  loadProducts(categoryId: number): void {
    this.productService.getJSONProducts().subscribe(data => {
      this.products = data.filter((i: IProduct) => i.categoryId === categoryId)
    },
      err => {
        console.log(err)
      }
    )
  }
}
