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

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatDivider
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {
  private ShopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);

  product? : Product;


  ngOnInit(): void {
      this.loadProduct();
  }

  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;
    this.ShopService.getProduct(+id).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
