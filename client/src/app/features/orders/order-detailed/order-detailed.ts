import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrderService } from './../../../core/services/order-service';
import { Component, inject, OnInit } from '@angular/core';
import { OrderModel } from '../../../shared/models/order-model';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AddressPipe } from "../../../shared/pipes/address-pipe";
import { PaymentCardPipe } from "../../../shared/pipes/payment-card-pipe";
import { Account } from '../../../core/services/account';
import { AdminService } from '../../../core/services/adminService';

@Component({
  selector: 'app-order-detailed',
  imports: [
    MatCardModule,
    MatButton,
    DatePipe,
    CurrencyPipe,
    AddressPipe,
    PaymentCardPipe,
    RouterLink
],
  templateUrl: './order-detailed.html',
  styleUrl: './order-detailed.scss'
})
export class OrderDetailed implements OnInit {
  private orderService = inject(OrderService);
  private activatedRoute = inject(ActivatedRoute);
  private accountService = inject(Account);
  private adminService = inject(AdminService);
  private router = inject(Router);
  order?: OrderModel;
  buttonText = this.accountService.isAdmin() ? 'Return to Admin' : 'Return to orders';


  ngOnInit(): void {
    this.loadOrder();
  }

  onReturnClick(){
    this.accountService.isAdmin()
      ? this.router.navigateByUrl('/admin')
      : this.router.navigateByUrl('/orders');
  }

  loadOrder(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;

    const loadOrderData = this.accountService.isAdmin()
      ? this.adminService.getOrder(+id)
      : this.orderService.getOrderDetailed(+id);


    loadOrderData.subscribe({
      next: order => this.order = order
    });
  }
}
