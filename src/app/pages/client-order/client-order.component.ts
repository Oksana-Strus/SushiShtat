import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder, Order } from 'src/app/shared/models/order/order.model';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.scss']
})
export class ClientOrderComponent implements OnInit {
  public order: IOrder = new Order();
  public info: any;
  public options: any;
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
  ) {
    this.initBasket();
  }

  ngOnInit(): void {
    this.initBasket();
    this.route.params.subscribe(params => {
      var orderId = params['id'];
      this.orderService.get(orderId).subscribe(data => {
        console.log(data);
        this.info = data.deliveryInfo;
        this.options = data.options;
        console.log('OOOOO', this.options[1])
      })
    });
  }

  initBasket(): void {
    this.orderService.basket$.subscribe(data => {
      this.order.updateBasketItems(data)
    })
  }

}
