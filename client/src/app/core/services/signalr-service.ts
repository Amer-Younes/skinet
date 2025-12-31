
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { OrderModel } from '../../shared/models/order-model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  hubUrl = environment.hubUrl;
  hubConnection?: HubConnection;
  orderSignal = signal<OrderModel | null>(null);

  createHubConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .catch(error => console.log(error));

    this.hubConnection.on('OrderCompleteNotification', (order: OrderModel) => {
      this.orderSignal.set(order)

    })
  }

  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch(error => console.log(error))
    }
  }
  }


