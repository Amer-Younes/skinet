import { OrderModel, OrderToCreate } from '../../shared/models/order-model';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  orderComplete = false;

  createOrder(orderToCreate: OrderToCreate){
    return this.http.post<OrderModel>(this.baseUrl + 'orders', orderToCreate);
  }

  getOrdersForUser(){
    return this.http.get<OrderModel[]>(this.baseUrl + 'orders');
  }

  getOrderDetailed(id: number){
    return this.http.get<OrderModel>(this.baseUrl + 'orders/' + id);
  }

}
