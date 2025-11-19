// src/app/pages/faq/faq.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12 animate-on-scroll">
          <h1 class="text-4xl md:text-5xl font-bold text-midnight-blue mb-4">
            Frequently Asked Questions
          </h1>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our services and processes
          </p>
        </div>
        
        <div class="max-w-4xl mx-auto">
          @if (faqs().length > 0) {
            <div class="space-y-4">
              @for (faq of faqs(); track faq.id; let i = $index) {
                <div class="bg-white rounded-lg shadow-md overflow-hidden animate-on-scroll">
                  <button 
                    (click)="toggleFAQ(i)"
                    class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300">
                    <span class="text-lg font-semibold text-midnight-blue pr-4">
                      {{ faq.question }}
                    </span>
                    <svg 
                      class="w-6 h-6 text-muted-gold transform transition-transform duration-300"
                      [class.rotate-180]="openIndex() === i"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  
                  @if (openIndex() === i) {
                    <div class="px-6 pb-5 text-gray-600 animate-on-scroll">
                      <div class="pt-2 border-t">
                        {{ faq.answer }}
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          } @else {
            <div class="text-center py-20 bg-white rounded-lg shadow-md">
              <div class="text-6xl mb-4">❓</div>
              <h3 class="text-2xl font-semibold text-gray-700 mb-2">No FAQs Available Yet</h3>
              <p class="text-gray-500">We're working on adding frequently asked questions. Please check back soon!</p>
            </div>
          }
        </div>
        
        <!-- Contact CTA -->
        <div class="max-w-4xl mx-auto mt-12 text-center bg-midnight-blue text-white p-8 rounded-lg shadow-lg animate-on-scroll">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p class="text-gray-200 mb-6">
            Our team is here to help. Get in touch with us for personalized assistance.
          </p>
          <a routerLink="/contact" 
             class="inline-block bg-muted-gold text-midnight-blue px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300 hover-lift">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  `
})
export class FaqComponent {
  private firebaseService = inject(FirebaseService);
  faqs = this.firebaseService.faqs;
  openIndex = signal<number | null>(null);
  
  toggleFAQ(index: number): void {
    this.openIndex.update(current => current === index ? null : index);
  }
}