import { inject, Injectable } from '@angular/core';
import { CartService } from './CartService';
import { forkJoin, of } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private cartService = inject(CartService);
  private accountService = inject(Account);

  init(){
    const cartId = localStorage.getItem('cart_id');
    const cart$ = cartId ? this.cartService.getCart(cartId) : of(null);

    return forkJoin({
      cart: cart$,
      user: this.accountService.getUserInfo()
    });
  }
}
