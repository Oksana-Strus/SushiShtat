import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from 'angularfire2/storage';
// import { Observable } from 'rxjs';
import { IDiscount } from 'src/app/shared/models/discount/discount.model';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {
  public adminDiscounts: Array<IDiscount> = [];
  public discountForm!: FormGroup;
  @ViewChild('image') imageInput!: ElementRef;
  public editStatus = false;
  public imageStatus: boolean = false;
  private editDiscountID = 0;


  constructor(
    private discountService: DiscountService,
    private fb: FormBuilder,
    public sanitizer: DomSanitizer,
    private afStorage: AngularFireStorage,

  ) { }

  ngOnInit(): void {
    this.initDiscountForm();
    this.loadDiscounts();
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      image: [null, Validators.required],
    })
  }

  loadDiscounts(): void {
    this.discountService.getJSONDiscount().subscribe(data => {
      this.adminDiscounts = data
    },
      err => {
        console.log(err)
      }
    )
  }


  createDiscount(): void {
    const discount = this.discountForm.value;
    console.log(discount)
    this.discountService.createJSONSDiscount(discount).subscribe(
      () => {
        this.loadDiscounts();
      }, err => {
        console.log(err);
      }
    )
    this.imageStatus = false;
    this.resetForm();
  }

  resetForm(): void {
    this.discountForm.reset();
    this.imageInput.nativeElement.value = "";
  }

  // getBase64(file: any) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  //   });
  // }


  // uploadFileImage(event: any): void {
  //   const file = event.target.files[0];
  //   const task = this.getBase64(file)
  //     .then(data => {
  //       this.discountForm.patchValue({
  //         image: data
  //       })
  //     });
  // }

  uploadFileImage(event: any): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const task = this.afStorage.upload(filePath, file);
    task.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        // this.icon = url;
        this.discountForm.patchValue({
          image: url
        })
      });
    });
  }

  deleteDiscount(discount: IDiscount): void {
    this.discountService.deleteJSONDiscount(discount.id as number).subscribe(
      () => {
        this.loadDiscounts();
      }, err => {
        console.log(err);
      }
    )
  }

  editDiscount(discount: IDiscount): void {
    this.discountForm.patchValue({
      image: discount.image,
    });
    this.editDiscountID = discount.id as number;
    this.editStatus = true;
  }

  updateDiscount(): void {
    const discount = this.discountForm.value;
    this.discountService.updateJSONDiscount(discount, this.editDiscountID).subscribe(
      () => {
        this.loadDiscounts();
      }, err => {
        console.log(err);
      }
    );
    this.initDiscountForm();
    this.editStatus = false;
  }

}
