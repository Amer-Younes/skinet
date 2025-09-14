import { MatBadge, MatBadgeModule } from '@angular/material/badge';
import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Busy } from '../../core/services/busy';
import { MatProgressBar } from '@angular/material/progress-bar';


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
    MatProgressBar
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  busyService = inject(Busy);
}
