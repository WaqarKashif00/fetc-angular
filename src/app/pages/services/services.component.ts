// src/app/pages/services/services.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Hero -->
      <section class="relative h-[70vh] overflow-hidden">
        <div class="absolute inset-0 bg-cover bg-center bg-fixed" 
             style="background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80');">
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-midnight-blue/95 to-blue-900/90"></div>
        <div class="relative z-10 h-full flex items-center">
          <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center text-white space-y-6 animate-fade-in-up">
              <div class="inline-block px-6 py-2 bg-muted-gold/20 backdrop-blur-sm border border-muted-gold/30 rounded-full text-muted-gold font-semibold text-sm tracking-wide">
                WHAT WE OFFER
              </div>
              <h1 class="text-5xl md:text-7xl font-bold leading-tight">
                IT Solutions
                <span class="block text-transparent bg-clip-text bg-gradient-to-r from-muted-gold via-yellow-400 to-muted-gold animate-gradient">
                  That Drive Success
                </span>
              </h1>
              <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive IT consultancy and development services tailored to your business needs
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Services Grid -->
      <section class="py-24 bg-gradient-to-b from-white to-gray-50">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            @for (service of services; track service.title; let i = $index) {
              <div class="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 scroll-fade-in"
                   [style.animation-delay]="i * 150 + 'ms'">
                <!-- Service Image -->
                <div class="relative h-80 overflow-hidden">
                  <img [src]="service.image" 
                       [alt]="service.title"
                       class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                  <div class="absolute inset-0 bg-gradient-to-t from-midnight-blue via-midnight-blue/60 to-transparent"></div>
                  
                  <!-- Icon Badge -->
                  <!-- <div class="absolute top-6 right-6 w-16 h-16 bg-muted-gold rounded-2xl flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                    {{ service.icon }}
                  </div> -->
                  
                  <!-- Title Overlay -->
                  <div class="absolute bottom-6 left-6 right-6">
                    <h3 class="text-3xl font-bold text-white mb-2">{{ service.title }}</h3>
                    <p class="text-gray-200">{{ service.subtitle }}</p>
                  </div>
                </div>
                
                <!-- Service Content -->
                <div class="p-8 space-y-6">
                  <p class="text-gray-700 text-lg leading-relaxed">{{ service.description }}</p>
                  
                  <div class="space-y-3">
                    <h4 class="font-bold text-midnight-blue text-lg">Key Services:</h4>
                    <ul class="grid grid-cols-1 gap-3">
                      @for (feature of service.features; track feature) {
                        <li class="flex items-start gap-3 group/item">
                          <div class="flex-shrink-0 w-6 h-6 bg-muted-gold/20 rounded-lg flex items-center justify-center mt-0.5 group-hover/item:bg-muted-gold transition-colors duration-300">
                            <svg class="w-4 h-4 text-muted-gold group-hover/item:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                            </svg>
                          </div>
                          <span class="text-gray-600 group-hover/item:text-midnight-blue transition-colors duration-300">{{ feature }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                  
                  <a routerLink="/contact" 
                     class="inline-flex items-center gap-3 px-8 py-4 bg-midnight-blue text-white rounded-xl font-semibold hover:bg-blue-900 transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn">
                    <span>Request Quote</span>
                    <svg class="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </a>
                </div>
                
                <!-- Decorative Border -->
                <div class="absolute inset-0 border-2 border-muted-gold opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 pointer-events-none"></div>
              </div>
            }
          </div>
        </div>
      </section>
      
      <!-- Standards & Certifications -->
      <section class="py-24 bg-white relative overflow-hidden">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16 scroll-fade-in">
            <div class="inline-block px-6 py-2 bg-midnight-blue/5 border border-midnight-blue/10 rounded-full text-midnight-blue font-semibold text-sm tracking-wide mb-4">
              CERTIFICATIONS & STANDARDS
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-midnight-blue mb-6">
              International Standards Implementation
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              We help organizations implement and maintain globally recognized standards
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
            @for (standard of standards; track standard.name; let i = $index) {
              <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 text-center group scroll-fade-in border-2 border-gray-100 hover:border-muted-gold"
                   [style.animation-delay]="i * 100 + 'ms'">
                <div class="text-4xl mb-4 transform group-hover:scale-110 transition-all duration-500">
                  {{ standard.icon }}
                </div>
                <h4 class="font-bold text-midnight-blue text-sm mb-2">{{ standard.name }}</h4>
                <p class="text-xs text-gray-600">{{ standard.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>
      
      <!-- Process Section -->
      <section class="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, #191970 1px, transparent 0); background-size: 40px 40px;"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 scroll-fade-in">
            <div class="inline-block px-6 py-2 bg-midnight-blue/5 border border-midnight-blue/10 rounded-full text-midnight-blue font-semibold text-sm tracking-wide mb-4">
              HOW WE WORK
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-midnight-blue mb-6">
              Our Proven Process
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              A streamlined approach that ensures quality, efficiency, and excellence in every project
            </p>
          </div>
          
          <div class="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            @for (step of process; track step.number; let i = $index) {
              <div class="relative scroll-fade-in" [style.animation-delay]="i * 150 + 'ms'">
                <!-- Connector Line -->
                @if (i < 3) {
                  <div class="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-muted-gold to-muted-gold/20 z-0"></div>
                }
                
                <div class="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <!-- Number Badge -->
                  <div class="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-midnight-blue to-blue-900 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {{ step.number }}
                  </div>
                  
                  <div class="pt-8 text-center space-y-4">
                    <h4 class="text-xl font-bold text-midnight-blue">{{ step.title }}</h4>
                    <p class="text-gray-600 leading-relaxed">{{ step.description }}</p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
      
      <!-- Industries We Serve -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16 scroll-fade-in">
            <div class="inline-block px-6 py-2 bg-midnight-blue/5 border border-midnight-blue/10 rounded-full text-midnight-blue font-semibold text-sm tracking-wide mb-4">
              SECTORS WE SERVE
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-midnight-blue">
              Specialized Industry Expertise
            </h2>
          </div>
          
          <div class="grid md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
            @for (industry of industries; track industry.name; let i = $index) {
              <div class="bg-gradient-to-br from-midnight-blue/5 to-blue-900/5 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 text-center group scroll-fade-in hover:bg-white"
                   [style.animation-delay]="i * 100 + 'ms'">
                <div class="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  {{ industry.icon }}
                </div>
                <h4 class="font-bold text-midnight-blue text-sm">{{ industry.name }}</h4>
              </div>
            }
          </div>
        </div>
      </section>
      
      <!-- CTA -->
      <section class="py-24 relative overflow-hidden">
        <div class="absolute inset-0 bg-cover bg-center bg-fixed" 
             style="background-image: url('https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1920&q=80');">
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-midnight-blue via-midnight-blue/95 to-blue-900/95"></div>
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl mx-auto text-center space-y-8 scroll-fade-in">
            <h2 class="text-4xl md:text-6xl font-bold text-white leading-tight">
              Need Custom
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-muted-gold via-yellow-400 to-muted-gold animate-gradient">
                IT Solutions?
              </span>
            </h2>
            <p class="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Let's discuss how we can help transform your technology infrastructure with our expertise
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-6 pt-6">
              <a routerLink="/contact" 
                 class="group px-12 py-5 bg-muted-gold text-midnight-blue rounded-full text-lg font-bold hover:bg-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-muted-gold/50">
                <span class="flex items-center justify-center gap-3">
                  Get Free Consultation
                  <svg class="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </span>
              </a>
              <a href="tel:+971507217976" 
                 class="group px-12 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105">
                Call: +971 50 7217976
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ServicesComponent {
  services = [
    {
      title: 'Cybersecurity Services',
      subtitle: 'Comprehensive Security Solutions',
      description: 'Protect your digital assets with penetration testing, vulnerability assessments, and security audits.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
      features: [
        'Penetration Testing & Ethical Hacking',
        'Vulnerability Assessment',
        'Security Audits & Risk Management',
        'Social Engineering Testing',
        'Web Application Security Testing',
        'Wireless Network Testing',
        'Physical Security Assessment',
        'Compliance & Governance (NCA, NESA)'
      ]
    },
    {
      title: 'Application Development',
      subtitle: 'Custom Software Solutions',
      description: 'Custom mobile and web application development tailored to your business needs.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      features: [
        'Native App Development (iOS & Android)',
        'Hybrid App Development',
        'Progressive Web Apps (PWA)',
        'Mobile App UI/UX Design',
        'Front-end Development (React, Angular, Vue)',
        'Back-end Development (PHP, Python, Node.js)',
        'Full-Stack Development',
        'App Maintenance & Support'
      ]
    },
    {
      title: 'Cloud Services',
      subtitle: 'Cloud Migration & Management',
      description: 'Leverage cloud solutions to reduce costs, increase scalability, and improve efficiency.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      features: [
        'Cloud Migration Strategy',
        'Cloud Architecture Design',
        'Multi-Cloud Solutions',
        'Managed Cloud Services',
        'Cloud Security & Compliance',
        'Backup & Disaster Recovery',
        'Cloud Cost Optimization',
        'DevOps & CI/CD Implementation'
      ]
    },
    {
      title: 'IT Consulting',
      subtitle: 'Strategic Technology Guidance',
      description: 'Expert guidance on IT strategy, infrastructure planning, and digital transformation.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      features: [
        'IT Strategy Development',
        'Infrastructure Planning',
        'System Integration',
        'Software Selection',
        'Project Management',
        'Digital Transformation Consulting',
        'Business Process Automation',
        'IT Training & Support'
      ]
    },
    {
      title: 'Website Development',
      subtitle: 'Professional Web Solutions',
      description: 'Design and build responsive, user-friendly websites that drive business growth.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
      features: [
        'Responsive Website Design',
        'E-commerce Solutions',
        'Content Management Systems',
        'SEO Optimization',
        'Website Maintenance',
        'Performance Optimization',
        'Website Security',
        'Custom Web Applications'
      ]
    },
    {
      title: 'Digital Marketing',
      subtitle: 'Online Presence & Growth',
      description: 'Comprehensive digital marketing services to enhance your online presence.',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80',
      features: [
        'Search Engine Optimization (SEO)',
        'Social Media Marketing',
        'Email Marketing Campaigns',
        'Content Marketing',
        'Pay-Per-Click Advertising',
        'Analytics & Reporting',
        'Brand Strategy',
        'Conversion Optimization'
      ]
    }
  ];
  
  standards = [
    { icon: '🔒', name: 'ISO 27001', desc: 'Information Security' },
    { icon: '✅', name: 'ISO 9001', desc: 'Quality Management' },
    { icon: '💼', name: 'ISO 20001', desc: 'Service Management' },
    { icon: '🔄', name: 'ISO 22301', desc: 'Business Continuity' },
    { icon: '🛡️', name: 'NCA', desc: 'Cyber Security Framework' },
    { icon: '⚡', name: 'NESA (SIA)', desc: 'Security Standards' }
  ];
  
  process = [
    {
      number: 1,
      title: 'Consultation',
      description: 'Understanding your requirements, challenges, and business objectives'
    },
    {
      number: 2,
      title: 'Planning',
      description: 'Developing comprehensive strategy and technical specifications'
    },
    {
      number: 3,
      title: 'Implementation',
      description: 'Professional execution with quality control and best practices'
    },
    {
      number: 4,
      title: 'Support',
      description: 'Ongoing maintenance, training, and technical support'
    }
  ];
  
  industries = [
    { icon: '🏦', name: 'Finance & Banking' },
    { icon: '🏥', name: 'Healthcare' },
    { icon: '🏛️', name: 'Government' },
    { icon: '🎓', name: 'Education' },
    { icon: '🏪', name: 'Retail & E-commerce' },
    { icon: '🏭', name: 'Manufacturing' }
  ];
}