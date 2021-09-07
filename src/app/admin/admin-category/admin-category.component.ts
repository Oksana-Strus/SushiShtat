import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/models/category/category.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  public adminCategories: Array<ICategory> = [];
  public categoryForm!: FormGroup;
  @ViewChild('icon') iconInput!: ElementRef;
  @ViewChild('image') imageInput!: ElementRef;
  public editStatus = false;
  public uploadPercent: Observable<number> | undefined | null;
  public icon: string = '';
  public imageStatus: boolean = false;
  private editCategoryID = 0;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();

  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      title: [null, Validators.required],
      image: [null, Validators.required],
      icon: [null, Validators.required]
    })
  }

  loadCategories(): void {
    this.categoryService.getJSONCategories().subscribe(data => {
      this.adminCategories = data
    },
      err => {
        console.log(err)
      }
    )
  }


  createCategory(): void {
    const category = this.categoryForm.value;
    console.log(category)
    this.categoryService.createJSONCategory(category).subscribe(
      () => {
        this.loadCategories();
      }, err => {
        console.log(err);
      }
    )
    this.imageStatus = false;
    this.resetForm();
  }

  resetForm(): void {
    this.categoryForm.reset();
    this.iconInput.nativeElement.value = "";
    this.imageInput.nativeElement.value = "";

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
        this.categoryForm.patchValue({
          image: data
        })
      });
  }

  uploadFileIcon(event: any): void {
    const file = event.target.files[0];
    const task = this.getBase64(file)
      .then(data => {
        this.categoryForm.patchValue({
          icon: data
        })
      });
  }

  deleteCategory(category: ICategory): void {
    this.categoryService.deleteJSONCategory(category.id as number).subscribe(
      () => {
        this.loadCategories();
      }, err => {
        console.log(err);
      }
    )
  }

  editCategory(category: ICategory): void {
    this.categoryForm.patchValue({
      title: category.title,
      image: category.image,
      icon: category.icon
    });
    this.editCategoryID = category.id as number;
    this.editStatus = true;
  }

  updateCategory(): void {
    const category = this.categoryForm.value;
    this.categoryService.updateJSONCategory(category, this.editCategoryID).subscribe(
      () => {
        this.loadCategories();
      }, err => {
        console.log(err);
      }
    );
    this.initCategoryForm();
    this.editStatus = false;
  }

  cancelClick(): void {
    this.editStatus = false;
    this.resetForm();
  }


}
