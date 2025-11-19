// src/app/pages/about/about.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Hero with Parallax -->
      <section class="relative h-[70vh] overflow-hidden">
        <div class="absolute inset-0 bg-cover bg-center bg-fixed" 
             style="background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80');">
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-midnight-blue/95 to-blue-900/90"></div>
        <div class="relative z-10 h-full flex items-center">
          <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center text-white space-y-6 animate-fade-in-up">
              <div class="inline-block px-6 py-2 bg-muted-gold/20 backdrop-blur-sm border border-muted-gold/30 rounded-full text-muted-gold font-semibold text-sm tracking-wide">
                ABOUT FETC
              </div>
              <h1 class="text-5xl md:text-7xl font-bold leading-tight">
                IT Consultancy Excellence
                <span class="block text-transparent bg-clip-text bg-gradient-to-r from-muted-gold via-yellow-400 to-muted-gold">
                  Since 2022
                </span>
              </h1>
              <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Pioneering innovative IT solutions with over 25 years of collective expertise in technology consulting
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Company Story -->
      <section class="py-24 bg-white relative overflow-hidden">
        <div class="absolute top-0 right-0 w-1/3 h-full opacity-5">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, #191970 1px, transparent 0); background-size: 40px 40px;"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div class="space-y-8 scroll-fade-in-left">
              <div class="space-y-4">
                <div class="inline-block px-6 py-2 bg-midnight-blue/5 border border-midnight-blue/10 rounded-full text-midnight-blue font-semibold text-sm tracking-wide">
                  OUR JOURNEY
                </div>
                <h2 class="text-4xl md:text-5xl font-bold text-midnight-blue">
                  Delivering Technology Solutions That Matter
                </h2>
              </div>
              
              <div class="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong>Future Experts for Technical Consultancy (FETC)</strong> was founded in <strong>March 2022</strong> by <strong>Dr. Eng. Ehab Salah Hashiem</strong>, a seasoned IT consultant with over 25 years of experience in the field, with a vision to provide high-quality technology solutions to businesses in need.
                </p>
                <p>
                  The company started as a consultancy firm, providing IT support and services to local businesses in Abu Dhabi. From the beginning, FETC established itself as a reliable and trustworthy partner for businesses, offering personalized service and expert advice.
                </p>
                <p>
                  As the demand for IT services grew, we expanded our offerings to include IT strategy and planning, cloud computing, cybersecurity, application development, and more. We developed our own application packages including ERP systems, university citation and journal systems, websites, and automation of business processes.
                </p>
                <p>
                  Today, FETC is recognized as a leading IT consultancy company, serving clients across a range of industries—from small startups to large enterprises—helping them navigate the complex world of IT and achieve their business objectives.
                </p>
              </div>
              
              <div class="grid grid-cols-3 gap-6 pt-6">
                @for (milestone of milestones; track milestone.year) {
                  <div class="text-center p-6 bg-gradient-to-br from-midnight-blue/5 to-blue-900/5 rounded-xl hover:shadow-lg transition-shadow duration-300">
                    <div class="text-3xl font-bold text-muted-gold mb-2">{{ milestone.year }}</div>
                    <div class="text-sm text-gray-600 font-medium">{{ milestone.label }}</div>
                  </div>
                }
              </div>
            </div>
            
            <div class="relative scroll-fade-in-right">
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-6">
                  <div class="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" 
                         alt="IT consulting team" 
                         class="w-full h-72 object-cover">
                  </div>
                  <div class="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                    <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80" 
                         alt="Development" 
                         class="w-full h-56 object-cover">
                  </div>
                </div>
                <div class="space-y-6 pt-12">
                  <div class="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80" 
                         alt="Cybersecurity" 
                         class="w-full h-56 object-cover">
                  </div>
                  <div class="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" 
                         alt="Technology work" 
                         class="w-full h-72 object-cover">
                  </div>
                </div>
              </div>
              
              <!-- Decorative Element -->
              <div class="absolute -bottom-8 -left-8 w-64 h-64 bg-muted-gold/10 rounded-full blur-3xl -z-10"></div>
              <div class="absolute -top-8 -right-8 w-64 h-64 bg-midnight-blue/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Mission & Vision -->
      <section class="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16 scroll-fade-in">
            <div class="inline-block px-6 py-2 bg-midnight-blue/5 border border-midnight-blue/10 rounded-full text-midnight-blue font-semibold text-sm tracking-wide mb-4">
              OUR PURPOSE
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-midnight-blue">
              Driven by Purpose, Guided by Values
            </h2>
          </div>
          
          <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div class="group relative bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden scroll-fade-in">
              <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-midnight-blue/10 to-transparent rounded-bl-full"></div>
              <div class="relative z-10 space-y-6">
                <div class="w-20 h-20 bg-gradient-to-br from-midnight-blue to-blue-900 rounded-2xl flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  🎯
                </div>
                <h3 class="text-3xl font-bold text-midnight-blue">Our Mission</h3>
                <p class="text-lg text-gray-700 leading-relaxed">
                  At FETC, we are committed to providing innovative and secure application development and cybersecurity solutions that help businesses achieve their goals. Our mission is to leverage our expertise and experience to deliver high-quality, user-friendly software applications and robust cybersecurity measures that protect our clients' assets and data from cyber threats.
                </p>
              </div>
            </div>
            
            <div class="group relative bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden scroll-fade-in animation-delay-200">
              <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-muted-gold/10 to-transparent rounded-bl-full"></div>
              <div class="relative z-10 space-y-6">
                <div class="w-20 h-20 bg-gradient-to-br from-muted-gold to-yellow-600 rounded-2xl flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  🚀
                </div>
                <h3 class="text-3xl font-bold text-midnight-blue">Our Vision</h3>
                <p class="text-lg text-gray-700 leading-relaxed">
                  We envision a world where businesses can leverage technology to drive innovation and growth, without compromising security or user experience. Our vision is to be the leading provider of application development and cybersecurity solutions for businesses in highly regulated industries across the region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Core Values -->
      <section class="py-24 bg-white relative overflow-hidden">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16 scroll-fade-in">
            <div class="inline-block px-6 py-2 bg-midnight-blue/5 border border-midnight-blue/10 rounded-full text-midnight-blue font-semibold text-sm tracking-wide mb-4">
              WHAT DEFINES US
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-midnight-blue">
              Our Core Values
            </h2>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            @for (value of values; track value.title; let i = $index) {
              <div class="group text-center scroll-fade-in" [style.animation-delay]="i * 100 + 'ms'">
                <div class="relative mb-6">
                  <div class="w-32 h-32 mx-auto bg-gradient-to-br from-midnight-blue to-blue-900 rounded-3xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                    <span class="text-5xl">{{ value.icon }}</span>
                  </div>
                  <div class="absolute inset-0 mx-auto w-32 h-32 bg-muted-gold/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <h4 class="text-2xl font-bold text-midnight-blue mb-3">{{ value.title }}</h4>
                <p class="text-gray-600 leading-relaxed">{{ value.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>
      
      <!-- Team Section -->
      <section class="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16 scroll-fade-in">
            <div class="inline-block px-6 py-2 bg-midnight-blue/5 border border-midnight-blue/10 rounded-full text-midnight-blue font-semibold text-sm tracking-wide mb-4">
              OUR LEADERSHIP
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-midnight-blue mb-6">
              Expert Team of IT Professionals
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Our success is built on the expertise and dedication of our highly skilled consultants, engineers, and developers
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
            @for (leader of leadership; track leader.name; let i = $index) {
              <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-center scroll-fade-in"
                   [style.animation-delay]="i * 100 + 'ms'">
                <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-midnight-blue to-blue-900 rounded-2xl flex items-center justify-center text-4xl">
                  {{ leader.icon }}
                </div>
                <h3 class="text-xl font-bold text-midnight-blue mb-2">{{ leader.name }}</h3>
                <p class="text-muted-gold font-semibold mb-3">{{ leader.title }}</p>
                <p class="text-gray-600 text-sm">{{ leader.phone }}</p>
                <p class="text-gray-600 text-sm">{{ leader.email }}</p>
              </div>
            }
          </div>
          
          <div class="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            @for (stat of teamStats; track stat.label; let i = $index) {
              <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-center scroll-fade-in"
                   [style.animation-delay]="i * 100 + 'ms'">
                <div class="text-5xl font-bold text-muted-gold mb-3">{{ stat.value }}</div>
                <div class="text-gray-600 font-medium">{{ stat.label }}</div>
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
              Ready to Work With
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-muted-gold via-yellow-400 to-muted-gold animate-gradient">
                Industry Experts?
              </span>
            </h2>
            <p class="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Partner with FETC and experience IT excellence that transforms your technology infrastructure
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-6 pt-6">
              <a routerLink="/contact" 
                 class="group px-12 py-5 bg-muted-gold text-midnight-blue rounded-full text-lg font-bold hover:bg-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-muted-gold/50">
                <span class="flex items-center justify-center gap-3">
                  Get in Touch
                  <svg class="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </span>
              </a>
              <a routerLink="/services" 
                 class="group px-12 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105">
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class AboutComponent {
  milestones = [
    { year: '2022', label: 'Founded' },
    { year: '100+', label: 'Projects' },
    { year: '25+', label: 'Years Exp' }
  ];
  
  values = [
    {
      icon: '⭐',
      title: 'Excellence',
      description: 'Maintaining the highest quality standards in all aspects of our work, from development to cybersecurity'
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'Operating with complete transparency, honesty, and ethical standards in all our dealings'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Continuously adapting our services to meet evolving needs and staying at the forefront of technology'
    },
    {
      icon: '🎯',
      title: 'Commitment',
      description: 'Unwavering dedication to exceeding client expectations and providing exceptional value and support'
    }
  ];
  
  leadership = [
    {
      icon: '👨‍💼',
      name: 'Dr. Eng. Ehab Salah Hashiem',
      title: 'General Manager & Founder',
      phone: '+971 50 7217976',
      email: 'ehab.hashiem@fetc.ae'
    },
    {
      icon: '👨‍💻',
      name: 'Eng. Osama Elsedik',
      title: 'Development Manager',
      phone: '+20 1001007011',
      email: 'osam.elsedik@fetc.ae'
    },
    {
      icon: '🔒',
      name: 'Eng. Hana Ehab Hashiem',
      title: 'Security Specialist',
      phone: '+971 50 4181306',
      email: 'info@fetc.ae'
    },
    {
      icon: '📈',
      name: 'Mr. Ahmad Ehab Hashiem',
      title: 'Business Development',
      phone: '+971 50 4027391',
      email: 'info@fetc.ae'
    }
  ];
  
  teamStats = [
    { value: '25+', label: 'Years Experience' },
    { value: '100%', label: 'Certified Professionals' },
    { value: 'ISO', label: 'Certified Standards' },
    { value: '3+', label: 'Countries Served' }
  ];
}