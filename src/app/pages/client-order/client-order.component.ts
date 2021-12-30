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
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      var orderId = params['id'];
      this.orderService.get(orderId).subscribe(data => {
        this.order = data
      })
    });
  }
}
