import { CartService } from './../../core/services/CartService';
import { MatBadge, MatBadgeModule } from '@angular/material/badge';
import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDivider, MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Busy } from '../../core/services/busy';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Account } from '../../core/services/account';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatBadgeModule,
    RouterLink,
    RouterLinkActive,
    MatProgressBar,
    MatMenuTrigger,
    MatMenu,
    MatDivider,
    MatMenuItem
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  busyService = inject(Busy);
  cartService = inject(CartService);
  accountService  = inject(Account);
  private router = inject(Router);

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.accountService.currentUser.set(null);
        this.router.navigateByUrl('/');
      }
    });

  }
}
