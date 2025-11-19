// src/app/pages/contact/contact.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Hero -->
      <section class="bg-gradient-to-r from-midnight-blue to-blue-900 text-white py-20">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 animate-on-scroll">Contact Us</h1>
          <p class="text-xl text-gray-200 max-w-3xl mx-auto animate-on-scroll">
            Get in touch with our team for any inquiries or project discussions
          </p>
        </div>
      </section>
      
      <!-- Contact Section -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <!-- Contact Form -->
            <div class="animate-on-scroll">
              <h2 class="text-3xl font-bold text-midnight-blue mb-6">Send us a Message</h2>
              
              @if (successMessage()) {
                <div class="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg">
                  {{ successMessage() }}
                </div>
              }
              
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input 
                    type="text"
                    formControlName="name"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                    placeholder="John Doe">
                  @if (contactForm.get('name')?.touched && contactForm.get('name')?.hasError('required')) {
                    <p class="text-red-500 text-sm mt-1">Name is required</p>
                  }
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input 
                    type="email"
                    formControlName="email"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                    placeholder="john@example.com">
                  @if (contactForm.get('email')?.touched && contactForm.get('email')?.hasError('required')) {
                    <p class="text-red-500 text-sm mt-1">Email is required</p>
                  }
                  @if (contactForm.get('email')?.touched && contactForm.get('email')?.hasError('email')) {
                    <p class="text-red-500 text-sm mt-1">Invalid email format</p>
                  }
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input 
                    type="tel"
                    formControlName="phone"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                    placeholder="+971 50 123 4567">
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input 
                    type="text"
                    formControlName="subject"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                    placeholder="Project Inquiry">
                  @if (contactForm.get('subject')?.touched && contactForm.get('subject')?.hasError('required')) {
                    <p class="text-red-500 text-sm mt-1">Subject is required</p>
                  }
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea 
                    formControlName="message"
                    rows="5"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                    placeholder="Tell us about your project..."></textarea>
                  @if (contactForm.get('message')?.touched && contactForm.get('message')?.hasError('required')) {
                    <p class="text-red-500 text-sm mt-1">Message is required</p>
                  }
                </div>
                
                <button 
                  type="submit"
                  [disabled]="contactForm.invalid || loading()"
                  class="w-full bg-midnight-blue text-white py-4 rounded-lg font-semibold hover:bg-blue-900 transition-all duration-300 disabled:bg-gray-400 hover-lift">
                  @if (loading()) {
                    <span>Sending...</span>
                  } @else {
                    <span>Send Message</span>
                  }
                </button>
              </form>
            </div>
            
            <!-- Contact Information -->
            <div class="animate-on-scroll">
              <h2 class="text-3xl font-bold text-midnight-blue mb-6">Get in Touch</h2>
              
              <div class="space-y-6 mb-8">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-midnight-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-midnight-blue mb-1">Address</h4>
                    <p class="text-gray-600">Dubai, United Arab Emirates</p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-midnight-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-midnight-blue mb-1">Phone</h4>
                    <p class="text-gray-600">+971 12 345 6789</p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-midnight-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-midnight-blue mb-1">Email</h4>
                    <p class="text-gray-600">info&#64;fetc.ae</p>
                  </div>
                </div>
              </div>
              
              <!-- Business Hours -->
              <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="font-bold text-midnight-blue mb-4">Business Hours</h3>
                <div class="space-y-2 text-sm text-gray-600">
                  <div class="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span class="font-semibold">8:00 AM - 6:00 PM</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Saturday:</span>
                    <span class="font-semibold">9:00 AM - 2:00 PM</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Sunday:</span>
                    <span class="font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ContactComponent {
  private fb = FormBuilder;
  
  loading = signal(false);
  successMessage = signal('');
  
  contactForm = new FormBuilder().group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });
  
  onSubmit(): void {
    if (this.contactForm.invalid) return;
    
    this.loading.set(true);
    
    // Simulate form submission
    setTimeout(() => {
      this.successMessage.set('Thank you for contacting us! We will get back to you soon.');
      this.contactForm.reset();
      this.loading.set(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        this.successMessage.set('');
      }, 5000);
    }, 1500);
  }
}