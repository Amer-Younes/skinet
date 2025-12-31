import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SignalrService } from '../../../core/services/signalr-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { AddressPipe } from '../../../shared/pipes/address-pipe';
import { PaymentCardPipe } from '../../../shared/pipes/payment-card-pipe';
import { OrderService } from '../../../core/services/order-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-checkout-success',
  imports: [
    MatButton,
    RouterLink,
    MatProgressSpinnerModule,
    DatePipe,
    AddressPipe,
    CurrencyPipe,
    PaymentCardPipe,
    NgIf

  ],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.scss'
})
export class CheckoutSuccess implements OnInit, OnDestroy {
  signalrService = inject(SignalrService);
  private orderService = inject(OrderService);
  private loadOrderTimeout?: ReturnType<typeof setTimeout>;

  async ngOnInit() {
    // If order signal is not set, try to fetch the latest order from the API
    // This handles cases where the webhook hasn't been processed yet
    if (!this.signalrService.orderSignal()) {
      // Wait up to 5 seconds for the SignalR message to arrive
      this.loadOrderTimeout = setTimeout(() => {
        this.fetchLatestOrder();
      }, 2000);
    }
  }

  private async fetchLatestOrder() {
    try {
      const orders = await firstValueFrom(this.orderService.getOrdersForUser());
      if (orders && orders.length > 0) {
        // Get the most recent order
        const latestOrder = orders[0];
        this.signalrService.orderSignal.set(latestOrder);
      }
    } catch (error) {
      console.error('Error fetching latest order:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.loadOrderTimeout) {
      clearTimeout(this.loadOrderTimeout);
    }
    this.orderService.orderComplete = false;
    this.signalrService.orderSignal.set(null);
  }
}
