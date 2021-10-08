import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Basket, IBasket, IOrder, Order, OrderOption, PaymentType } from 'src/app/shared/models/order/order.model';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public callInDoor: boolean | undefined;
  public callForConfirm: boolean | undefined;
  public order: IOrder = new Order();
  public orderForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrdersService,
  ) {
    this.initBasket();
  }

  ngOnInit(): void {
    this.initOrderForm()
    this.initBasket();
  }

  initBasket(): void {
    this.orderService.basket$.subscribe(data => {
      console.log('basket - updated')
      this.order.updateBasketItems(data)
    })
  }
  // !!!!!!!!!!!!!
  createClientsOrder(): void {
    this.order.updateDeliveryInfo(this.orderForm.value)
    this.orderService.create(this.order).subscribe(
      (val: any) => {
        this.router.navigateByUrl(`clientsOrder/${val.id}`)
      }, err => {
        console.log(err);
      }
    )
  }

  initOrderForm(): void {
    this.orderForm = this.fb.group({
      name: [null, Validators.required],
      tel: [null, Validators.required],
      address: [null, Validators.required],
      house: [null, Validators.required],
      appartaments: [null, Validators.required],
      entrance: [null, Validators.required],
      comment: [null,],
      callForConfirm: [null,],
      callInDoor: [null,],
      paymentType: ['Cash', Validators.required],
      option: [Validators.required]
    })
  }

  addItem(productId: number): void {
    this.orderService.addToBasket(productId, 1);
  }

  add(option: OrderOption) {
    this.order.addOption(option, 1)
  }

  remove(option: OrderOption) {
    this.order.removeOption(option, 1)
  }

  removeItem(productId: number): void {
    this.orderService.removeBasketItem(productId, 1);
  }

  removeAllItems(productId: number): void {
    this.orderService.removeAllItems(productId);
  }
}
