// src/app/pages/testimonials/testimonials.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Hero -->
      <section class="relative h-[70vh] overflow-hidden">
        <div class="absolute inset-0 bg-cover bg-center bg-fixed" 
             style="background-image: url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80');">
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-midnight-blue/95 to-blue-900/90"></div>
        <div class="relative z-10 h-full flex items-center">
          <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center text-white space-y-6 animate-fade-in-up">
              <div class="inline-block px-6 py-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full text-yellow-400 font-semibold text-sm tracking-wide">
                CLIENT SUCCESS STORIES
              </div>
              <h1 class="text-5xl md:text-7xl font-bold leading-tight">
                What Our Clients
                <span class="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 animate-gradient">
                  Say About Us
                </span>
              </h1>
              <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Real experiences from organizations we've partnered with
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Stats Section -->
      <section class="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            @for (stat of stats; track stat.label; let i = $index) {
              <div class="text-center scroll-fade-in" [style.animation-delay]="i * 100 + 'ms'">
                <div class="text-5xl font-bold text-yellow-500 mb-2">{{ stat.value }}</div>
                <div class="text-gray-600 font-medium">{{ stat.label }}</div>
              </div>
            }
          </div>
        </div>
      </section>
      
      <!-- Testimonials Grid -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16 scroll-fade-in">
            <div class="inline-block px-6 py-2 bg-midnight-blue/5 border border-midnight-blue/10 rounded-full text-midnight-blue font-semibold text-sm tracking-wide mb-4">
              TESTIMONIALS
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-midnight-blue mb-6">
              Trusted by Industry Leaders
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our clients have to say about their experience working with FETC
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            @for (testimonial of testimonials; track testimonial.id; let i = $index) {
              <div class="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 scroll-fade-in"
                   [style.animation-delay]="i * 100 + 'ms'">
                <!-- Rating -->
                <div class="flex items-center gap-1 mb-4">
                  @for (star of [1,2,3,4,5]; track star) {
                    <svg class="w-5 h-5 text-yellow-400" [class.text-gray-300]="star > testimonial.rating" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  }
                </div>
                
                <!-- Quote -->
                <div class="relative mb-6">
                  <svg class="absolute -top-2 -left-2 w-8 h-8 text-yellow-400/20" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z"/>
                  </svg>
                  <p class="text-gray-700 leading-relaxed pl-6 italic">
                    "{{ testimonial.quote }}"
                  </p>
                </div>
                
                <!-- Client Info -->
                <div class="flex items-center gap-4 pt-6 border-t border-gray-200">
                  <div class="w-14 h-14 bg-gradient-to-br from-midnight-blue to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {{ getInitials(testimonial.name) }}
                  </div>
                  <div>
                    <div class="font-bold text-midnight-blue">{{ testimonial.name }}</div>
                    <div class="text-sm text-yellow-600 font-semibold">{{ testimonial.position }}</div>
                    <div class="text-sm text-gray-500">{{ testimonial.company }}</div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
      
      <!-- Video Testimonials -->
      <section class="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16 scroll-fade-in">
            <h2 class="text-4xl md:text-5xl font-bold text-midnight-blue mb-6">
              Video Testimonials
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear directly from our clients about their success stories
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            @for (video of videoTestimonials; track video.id; let i = $index) {
              <div class="relative rounded-2xl overflow-hidden shadow-2xl group scroll-fade-in"
                   [style.animation-delay]="i * 150 + 'ms'">
                <img [src]="video.thumbnail" 
                     [alt]="video.title"
                     class="w-full h-80 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 via-midnight-blue/40 to-transparent flex items-center justify-center">
                  <button class="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-midnight-blue transform group-hover:scale-110 transition-all duration-300 shadow-2xl">
                    <svg class="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 class="text-xl font-bold mb-2">{{ video.title }}</h3>
                  <p class="text-gray-200 text-sm">{{ video.client }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
      
      <!-- CTA -->
      <section class="py-24 relative overflow-hidden">
        <div class="absolute inset-0 bg-cover bg-center bg-fixed" 
             style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80');">
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-midnight-blue via-midnight-blue/95 to-blue-900/95"></div>
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl mx-auto text-center space-y-8 scroll-fade-in">
            <h2 class="text-4xl md:text-6xl font-bold text-white leading-tight">
              Ready to Join Our
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 animate-gradient">
                Success Stories?
              </span>
            </h2>
            <p class="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Let's work together to achieve your technology goals and create your own success story
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-6 pt-6">
              <a routerLink="/contact" 
                 class="group px-12 py-5 bg-yellow-400 text-midnight-blue rounded-full text-lg font-bold hover:bg-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span class="flex items-center justify-center gap-3">
                  Start Your Project
                  <svg class="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </span>
              </a>
              <a href="https://wa.me/971507217976?text=Hello%20FETC%2C%20I%20would%20like%20to%20discuss%20a%20project" 
                 target="_blank"
                 rel="noopener noreferrer"
                 class="group px-12 py-5 bg-green-500 text-white rounded-full text-lg font-bold hover:bg-green-600 transition-all duration-300 hover:scale-105">
                <span class="flex items-center justify-center gap-3">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class TestimonialsComponent {
  stats = [
    { value: '98%', label: 'Client Satisfaction' },
    { value: '100+', label: 'Projects Completed' },
    { value: '50+', label: 'Happy Clients' },
    { value: '15+', label: 'Industry Awards' }
  ];
  
  testimonials = [
    {
      id: 1,
      name: 'Ahmed Al Mansouri',
      position: 'CTO',
      company: 'UAE Financial Services',
      rating: 5,
      quote: 'FETC delivered an outstanding ERP solution that transformed our operations. Their expertise in cybersecurity gave us complete peace of mind. Highly recommended!'
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      position: 'Director of IT',
      company: 'Healthcare Group',
      rating: 5,
      quote: 'The team at FETC went above and beyond to ensure our healthcare management system met all compliance requirements. Their attention to detail is exceptional.'
    },
    {
      id: 3,
      name: 'Mohammed bin Rashid',
      position: 'IT Manager',
      company: 'Government Authority',
      rating: 5,
      quote: 'Working with FETC on our citizen portal was seamless. They understood our security requirements and delivered a robust, user-friendly solution on time.'
    },
    {
      id: 4,
      name: 'Jennifer Williams',
      position: 'VP of Technology',
      company: 'E-Commerce Platform',
      rating: 5,
      quote: 'FETC\'s cloud migration services helped us scale our operations efficiently. Their 24/7 support ensures our systems run smoothly at all times.'
    },
    {
      id: 5,
      name: 'Dr. Khalid Hassan',
      position: 'Dean',
      company: 'University',
      rating: 5,
      quote: 'The custom citation and journal management system developed by FETC has revolutionized how we handle academic publications. Truly innovative work!'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      position: 'Security Officer',
      company: 'Enterprise Corp',
      rating: 5,
      quote: 'FETC\'s penetration testing services identified vulnerabilities we didn\'t know existed. Their ISO 27001 implementation was thorough and professional.'
    }
  ];
  
  videoTestimonials = [
    {
      id: 1,
      title: 'Digital Transformation Success',
      client: 'Financial Services Company',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
    },
    {
      id: 2,
      title: 'Cybersecurity Implementation',
      client: 'Healthcare Provider',
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80'
    }
  ];
  
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}