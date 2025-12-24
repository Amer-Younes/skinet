import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/CartService';
import { Snackbar } from '../services/snackbar';

export const cartGuard: CanActivateFn = (route, state) => {

  const cartService = inject(CartService);
  const router = inject(Router);
  const snack = inject(Snackbar);


  if(!cartService.cart() || cartService.cart()?.items.length === 0){
    snack.error("Your cart is empty. Please add items to your cart before proceeding to checkout.");
    router.navigate(['/shop']);
    return false;
  }

  return true;
};
