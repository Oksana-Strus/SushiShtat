import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/models/category/category.model';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  public adminProducts: Array<IProduct> = [];
  public productForm!: FormGroup;
  @ViewChild('icon') iconInput!: ElementRef;
  @ViewChild('image') imageInput!: ElementRef;
  public editStatus = false;
  // public uploadPercent: Observable<number> | undefined | null;
  public icon: string = '';
  public imageStatus: boolean = false;
  private editProductID = 0;
  public userCategories: Array<ICategory> = [];
  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    public sanitizer: DomSanitizer,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadProducts();
    this.loadCategories();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      image: [null, Validators.required],
      icon: [null, Validators.required],
      categoryId: [null, Validators.required],
    })
  }

  loadProducts(): void {
    this.productService.getJSONProducts().subscribe(data => {
      this.adminProducts = data
    },
      err => {
        console.log(err)
      }
    )
  }

  createProduct(): void {
    const product = this.productForm.value;
    console.log(product)
    this.productService.createJSONProduct(product).subscribe(
      () => {
        this.loadProducts();
      }, err => {
        console.log(err);
      }
    )
    this.imageStatus = false;
    this.resetForm();
  }

  getCategoryName(categoryId: number): string {
    return this.userCategories.find(i => i.id == categoryId)?.title ?? ''
  }

  resetForm(): void {
    this.productForm.reset();
    this.iconInput.nativeElement.value = "";
    this.imageInput.nativeElement.value = "";
  }

  cancelClick(): void {
    this.editStatus = false;
    this.resetForm();
  }

  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  uploadFileImage(event: any): void {
    const file = event.target.files[0];
    const task = this.getBase64(file)
      .then(data => {
        this.productForm.patchValue({
          image: data
        })
      });
  }

  uploadFileIcon(event: any): void {
    const file = event.target.files[0];
    const task = this.getBase64(file)
      .then(data => {
        this.productForm.patchValue({
          icon: data
        })
      });
  }

  deleteProduct(product: IProduct): void {
    this.productService.deleteJSONProduct(product.id as number).subscribe(
      () => {
        this.loadProducts();
      }, err => {
        console.log(err);
      }
    )
  }

  editProduct(product: IProduct): void {
    this.productForm.patchValue({
      title: product.title,
      description: product.description,
      weight: product.weight,
      image: product.image,
      icon: product.icon,
      categoryId: product.categoryId,
      price: product.price,
    });
    this.editProductID = product.id as number;
    this.editStatus = true;
  }

  updateProduct(): void {
    const product = this.productForm.value;
    this.productService.updateJSONProduct(product, this.editProductID).subscribe(
      () => {
        this.loadProducts();
      }, err => {
        console.log(err);
      }
    );
    this.initProductForm();
    this.editStatus = false;
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

}
