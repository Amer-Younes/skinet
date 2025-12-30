import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order-service';
import { OrderModel } from '../../shared/models/order-model';
import { RouterLink } from "@angular/router";
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [
    RouterLink,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './order.html',
  styleUrl: './order.scss'
})
export class Order implements OnInit {
  private orderService = inject(OrderService);
  orders : OrderModel[] = [];



  ngOnInit(): void {
    this.orderService.getOrdersForUser().subscribe({
      next: orders => {
        this.orders = orders;
      }
    })
  }
}
