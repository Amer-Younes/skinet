import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../shared/models/products';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/CartService';
import { CdkAutofill } from "@angular/cdk/text-field";

@Component({
  selector: 'app-product-item',
  imports: [MatCard,
    MatCardActions,
    MatCardContent,
    CurrencyPipe,
    MatButton,
    MatIcon,
    RouterLink, CdkAutofill],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss'
})
export class ProductItem {
  @Input() product?: Product;
  cartService = inject(CartService);
}
