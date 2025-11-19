import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
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
              <div class="inline-block px-6 py-2 bg-blue-400/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-400 font-semibold text-sm tracking-wide">
                OUR PORTFOLIO
              </div>
              <h1 class="text-5xl md:text-7xl font-bold leading-tight">
                Success Stories
                <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-gradient">
                  & Case Studies
                </span>
              </h1>
              <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Delivering innovative IT solutions to leading organizations across multiple sectors
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Projects Grid -->
      <section class="py-24 bg-gradient-to-b from-white to-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16 scroll-fade-in">
            <h2 class="text-4xl md:text-5xl font-bold text-midnight-blue mb-4">
              Featured Projects
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Successful implementations across finance, healthcare, government, and education sectors
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            @for (project of projects; track project.id; let i = $index) {
              <div class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 scroll-fade-in"
                   [style.animation-delay]="i * 100 + 'ms'">
                <!-- Project Image -->
                <div class="relative h-56 overflow-hidden">
                  <img [src]="project.image" 
                       [alt]="project.title"
                       class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                  <div class="absolute inset-0 bg-gradient-to-t from-midnight-blue via-midnight-blue/60 to-transparent"></div>
                  
                  <!-- Category Badge -->
                  <div class="absolute top-6 right-6 px-4 py-2 bg-blue-400 text-midnight-blue rounded-full text-sm font-bold">
                    {{ project.category }}
                  </div>
                  
                  <!-- Title Overlay -->
                  <div class="absolute bottom-6 left-6 right-6">
                    <h3 class="text-2xl font-bold text-white">{{ project.title }}</h3>
                  </div>
                </div>
                
                <!-- Project Content -->
                <div class="p-6 space-y-4">
                  <p class="text-gray-600">{{ project.description }}</p>
                  
                  <div class="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
                    <div>
                      <div class="text-sm text-gray-500 font-semibold">Client</div>
                      <div class="text-midnight-blue font-bold">{{ project.client }}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500 font-semibold">Year</div>
                      <div class="text-midnight-blue font-bold">{{ project.year }}</div>
                    </div>
                  </div>
                  
                  <div class="flex flex-wrap gap-2">
                    @for (tech of project.technologies; track tech) {
                      <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                        {{ tech }}
                      </span>
                    }
                  </div>
                  
                  <div class="flex items-center justify-between pt-4">
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span class="text-sm font-semibold text-blue-400">{{ project.status }}</span>
                    </div>
                    <a href="#" class="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-500 transition-colors">
                      View Case Study
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
      
      <!-- Stats -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-midnight-blue mb-12 text-center">
            Project Statistics
          </h2>
          <div class="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            @for (stat of stats; track stat.label; let i = $index) {
              <div class="text-center scroll-fade-in" [style.animation-delay]="i * 100 + 'ms'">
                <div class="text-5xl font-bold text-blue-400 mb-2">{{ stat.value }}</div>
                <div class="text-gray-600 font-medium">{{ stat.label }}</div>
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
              Ready to Start Your
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-gradient">
                Next Project?
              </span>
            </h2>
            <p class="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Let's discuss how our expertise can help achieve your business goals
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-6 pt-6">
              <a href="/contact" 
                 class="group px-12 py-5 bg-blue-400 text-midnight-blue rounded-full text-lg font-bold hover:bg-cyan-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span class="flex items-center justify-center gap-3">
                  Get Started
                  <svg class="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ProjectsComponent {
  projects = [
    {
      id: 1,
      title: 'Financial Institution ERP',
      category: 'Finance',
      description: 'Complete ERP implementation for a leading UAE financial institution, streamlining operations and improving reporting.',
      client: 'UAE Bank',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
      technologies: ['ERP', 'Cloud', 'Security'],
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Healthcare Management System',
      category: 'Healthcare',
      description: 'Custom web application for healthcare provider with patient management, appointment scheduling, and secure data handling.',
      client: 'Medical Group',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
      technologies: ['React', 'Node.js', 'HIPAA'],
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Government Portal Development',
      category: 'Government',
      description: 'Secure government citizen portal with authentication, document management, and real-time notifications.',
      client: 'Government Agency',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
      technologies: ['Angular', 'Security', 'API'],
      status: 'Completed'
    },
    {
      id: 4,
      title: 'University Citation System',
      category: 'Education',
      description: 'Custom platform for managing academic citations and journal submissions with peer review workflow.',
      client: 'University',
      year: '2022',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
      technologies: ['Custom App', 'Database', 'Workflow'],
      status: 'Completed'
    },
    {
      id: 5,
      title: 'E-Commerce Platform',
      category: 'Retail',
      description: 'Full-stack e-commerce solution with payment gateway integration, inventory management, and analytics dashboard.',
      client: 'E-Retail Co',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      technologies: ['React', 'Node.js', 'Stripe'],
      status: 'Completed'
    },
    {
      id: 6,
      title: 'Cybersecurity Audit & Implementation',
      category: 'Security',
      description: 'Comprehensive security assessment and implementation of ISO 27001 compliance for enterprise organization.',
      client: 'Enterprise Corp',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
      technologies: ['Security', 'ISO 27001', 'Testing'],
      status: 'Completed'
    }
  ];

  stats = [
    { value: '100+', label: 'Projects Delivered' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Team Members' },
    { value: '3+', label: 'Countries Served' }
  ];
}