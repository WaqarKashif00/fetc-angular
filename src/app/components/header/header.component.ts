// src/app/components/header/header.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styles: [`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
  `]
})
export class HeaderComponent {
  mobileMenuOpen = signal(false);
  
  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(value => !value);
  }
  
  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}

// src/app/components/header/header.component.html
/* Create this file separately with the following content: */