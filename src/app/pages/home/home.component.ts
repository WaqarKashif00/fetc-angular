// src/app/pages/home/home.component.ts
import { Component, computed, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private firebaseService = inject(FirebaseService);
  
  // Get latest 3 blog posts
  latestBlogs = computed(() => this.firebaseService.blogs().slice(0, 3));
  
  // Hero Slider
  currentSlideIndex = signal(0);
  
  heroSlides = [
    {
      title: 'Digital Transformation',
      subtitle: 'Leading provider of innovative IT solutions',
      description: 'Empower your business with cutting-edge technology solutions tailored to your unique needs',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
      cta: 'Start Your Journey'
    },
    {
      title: 'Cybersecurity Excellence',
      subtitle: 'Protect your digital assets from evolving threats',
      description: 'Comprehensive security solutions with penetration testing and compliance management for complete peace of mind',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80',
      cta: 'Learn More'
    },
    {
      title: 'Custom Development',
      subtitle: 'Bespoke applications built for your business',
      description: 'From concept to deployment, we deliver high-quality mobile and web applications that drive growth',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
      cta: 'Explore Services'
    }
  ];
  
constructor(
  private sanitizer: DomSanitizer
) {
  // Auto-advance slides
  effect(() => {
    const interval = setInterval(() => {
      this.currentSlideIndex.update(index => (index + 1) % this.heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  });
}

  
  goToSlide(index: number): void {
    this.currentSlideIndex.set(index);
  }
  
  nextSlide(): void {
    this.currentSlideIndex.update(index => (index + 1) % this.heroSlides.length);
  }
  
  prevSlide(): void {
    this.currentSlideIndex.update(index => (index - 1 + this.heroSlides.length) % this.heroSlides.length);
  }
  


  
  services = [
    {
      icon: 'cybersecurity',
      title: 'Cybersecurity',
      description: 'Comprehensive cybersecurity solutions including penetration testing, risk assessments, and security audits.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80'
    },
    {
      icon: 'development',
      title: 'Application Development',
      description: 'Custom mobile and web application development with native, hybrid, and full-stack solutions.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'
    },
    {
      icon: 'cloud',
      title: 'Cloud Services',
      description: 'Cloud migration, architecture design, and managed cloud services to reduce costs and improve efficiency.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80'
    },
    {
      icon: 'consulting',
      title: 'IT Consulting',
      description: 'Expert guidance on technology decisions, infrastructure planning, and digital transformation strategies.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80'
    }
  ];
  
  features = [
    {
      icon: 'clock',
      title: '25+ Years of Experience',
      description: 'Founded by Dr. Eng. Ehab Salah Hashiem with over 25 years of IT consulting expertise'
    },
    {
      icon: 'award',
      title: 'ISO Certified',
      description: 'Implementation of international standards including ISO 27001, 9001, 20001, and 22301'
    },
    {
      icon: 'shield',
      title: 'Highly Regulated Industries',
      description: 'Specialized expertise in finance, healthcare, and government sectors'
    },
    {
      icon: 'support',
      title: 'End-to-End Solutions',
      description: 'From strategy and development to implementation and ongoing support'
    }
  ];
  
  formatDate(timestamp: any): string {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
  
getIconSvg(iconName: string): SafeHtml {
  const icons: Record<string, string> = {
      cybersecurity: '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>',
      development: '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
      cloud: '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>',
      consulting: '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
      clock: '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
      award: '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>',
      shield: '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
      support: '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
      rocket: '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
      briefcase: '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
      star: '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>',
      globe: '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    };
    return this.sanitizer.bypassSecurityTrustHtml(icons[iconName] || '');
  }





}