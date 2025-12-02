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
  activeSubmenu = signal<string | null>(null);
  
  menuItems = [
    {
      label: 'Services',
      path: '/services',
      submenu: [
        { label: 'Cybersecurity', path: '/services', icon: '🔒' },
        { label: 'Application Development', path: '/services', icon: '💻' },
        { label: 'Cloud Services', path: '/services', icon: '☁️' },
        { label: 'IT Consulting', path: '/services', icon: '📋' },
        { label: 'Website Development', path: '/services', icon: '🌐' },
        { label: 'Digital Marketing', path: '/services', icon: '🛡️' }
      ]
    },
    {
      label: 'Company',
      path: '/about',
      submenu: [
        { label: 'About Us', path: '/about', icon: '🏢' },
        { label: 'Our Team', path: '/about', icon: '👥' },
        { label: 'Testimonials', path: '/testimonials', icon: '⭐' },
        { label: 'Career', path: '/contact', icon: '💼' }
      ]
    },
    {
      label: 'Resources',
      path: '/blog',
      submenu: [
        { label: 'Blog', path: '/blog', icon: '📝' },
        { label: 'Projects', path: '/projects', icon: '🎯' },
        { label: 'FAQ', path: '/faq', icon: '❓' },
        { label: 'Contact', path: '/contact', icon: '📞' }
      ]
    }
  ];
  
  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(value => !value);
  }
  
  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.activeSubmenu.set(null);
  }
  
  toggleSubmenu(menuLabel: string): void {
    this.activeSubmenu.update(current => current === menuLabel ? null : menuLabel);
  }
  
  isSubmenuOpen(menuLabel: string): boolean {
    return this.activeSubmenu() === menuLabel;
  }
}