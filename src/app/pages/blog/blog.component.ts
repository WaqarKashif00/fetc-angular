
// src/app/pages/blog/blog.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12 animate-on-scroll">
          <h1 class="text-4xl md:text-5xl font-bold text-midnight-blue mb-4">
            Our Blog
          </h1>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Insights, updates, and expert perspectives on IT consulting and cybersecurity
          </p>
        </div>
        
        @if (blogs().length > 0) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (blog of blogs(); track blog.id) {
              <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 animate-on-scroll">
                @if (blog.imageUrl) {
                  <img [src]="blog.imageUrl" 
                       [alt]="blog.title" 
                       class="w-full h-56 object-cover">
                } @else {
                  <div class="w-full h-56 bg-gradient-to-br from-midnight-blue to-blue-900 flex items-center justify-center">
                    <span class="text-white text-7xl">📝</span>
                  </div>
                }
                <div class="p-6">
                  <div class="text-sm text-gray-500 mb-2">
                    {{ formatDate(blog.createdAt) }}
                  </div>
                  <h2 class="text-2xl font-bold text-midnight-blue mb-3 line-clamp-2">
                    {{ blog.title }}
                  </h2>
                  <p class="text-gray-600 mb-4 line-clamp-3">
                    {{ blog.content }}
                  </p>
                  <a [routerLink]="['/blog', blog.id]" 
                     class="inline-block text-blue-400 font-semibold hover:text-blue-600 transition-colors duration-300">
                    Read Full Article →
                  </a>
                </div>
              </article>
            }
          </div>
        } @else {
          <div class="text-center py-20">
            <div class="text-6xl mb-4">📝</div>
            <h3 class="text-2xl font-semibold text-gray-700 mb-2">No Blog Posts Yet</h3>
            <p class="text-gray-500">Check back soon for exciting content!</p>
          </div>
        }
      </div>
    </div>
  `
})
export class BlogComponent {
  private firebaseService = inject(FirebaseService);
  blogs = this.firebaseService.blogs;
  
  formatDate(timestamp: any): string {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}