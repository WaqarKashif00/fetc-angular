// src/app/pages/home/home.component.ts
import { Component, computed, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

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
  
  constructor() {
    // Auto-advance slides
    effect(() => {
      const interval = setInterval(() => {
        this.currentSlideIndex.update(index => (index + 1) % this.heroSlides.length);
      }, 5000);
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
      icon: '🔒',
      title: 'Cybersecurity',
      description: 'Comprehensive cybersecurity solutions including penetration testing, risk assessments, and security audits.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80'
    },
    {
      icon: '💻',
      title: 'Application Development',
      description: 'Custom mobile and web application development with native, hybrid, and full-stack solutions.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'
    },
    {
      icon: '☁️',
      title: 'Cloud Services',
      description: 'Cloud migration, architecture design, and managed cloud services to reduce costs and improve efficiency.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80'
    },
    {
      icon: '📋',
      title: 'IT Consulting',
      description: 'Expert guidance on technology decisions, infrastructure planning, and digital transformation strategies.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80'
    }
  ];
  
  features = [
    {
      icon: '✓',
      title: '25+ Years of Experience',
      description: 'Founded by Dr. Eng. Ehab Salah Hashiem with over 25 years of IT consulting expertise'
    },
    {
      icon: '✓',
      title: 'ISO Certified',
      description: 'Implementation of international standards including ISO 27001, 9001, 20001, and 22301'
    },
    {
      icon: '✓',
      title: 'Highly Regulated Industries',
      description: 'Specialized expertise in finance, healthcare, and government sectors'
    },
    {
      icon: '✓',
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
}