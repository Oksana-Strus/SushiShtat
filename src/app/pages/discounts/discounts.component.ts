import { Component, OnInit } from '@angular/core';
import { IDiscount } from 'src/app/shared/models/discount/discount.model';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  public userDiscounts: Array<IDiscount> = [];

  constructor(
    private discountService: DiscountService
  ) { }

  ngOnInit(): void {
    this.loadDiscounts();
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
}
