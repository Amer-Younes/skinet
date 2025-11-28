import { ActivatedRoute } from '@angular/router';
import { ShopService } from './../../../core/services/shopService';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/products';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { CartService } from '../../../core/services/CartService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatDivider,
    FormsModule
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {
  private ShopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  product? : Product;
  quantityInCart: number = 0;
  quantity: number = 1;

  ngOnInit(): void {
      this.loadProduct();
  }

  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;
    this.ShopService.getProduct(+id).subscribe({
      next: (product) => {
        this.product = product;
        this.updateQuantityInCart();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  updateCart(){
    if(!this.product) return;
    if(this.quantity > this.quantityInCart){
      const itemsToAdd = this.quantity - this.quantityInCart;
      this.quantityInCart += itemsToAdd;
      this.cartService.addItemToCart(this.product, itemsToAdd);
  }else {
    const itemsToRemove = this.quantityInCart - this.quantity;
    this.quantityInCart -= itemsToRemove;
    this.cartService.removeItemFromCart(this.product.id, itemsToRemove);
  }
}

  updateQuantityInCart(){
    this.quantityInCart = this.cartService.cart()?.items.find(x => x.productId === this.product?.id)?.quantity || 0;
    this.quantity = this.quantityInCart || 1 ;
  }
  getButtonText(){
    return this.quantityInCart>0 ? 'Update cart' : 'Add to Cart';
  }
}
