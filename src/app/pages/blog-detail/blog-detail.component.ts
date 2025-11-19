import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FirebaseService, Blog } from '../../services/firebase.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        @if (blog(); as blogPost) {
          <article class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-on-scroll">
            @if (blogPost.imageUrl) {
              <img [src]="blogPost.imageUrl" 
                   [alt]="blogPost.title" 
                   class="w-full h-96 object-cover">
            } @else {
              <div class="w-full h-96 bg-gradient-to-br from-midnight-blue to-blue-900 flex items-center justify-center">
                <span class="text-white text-9xl">📝</span>
              </div>
            }
            
            <div class="p-8 md:p-12">
              <div class="mb-6">
                <a routerLink="/blog" 
                   class="text-blue-400 hover:text-blue-600 transition-colors duration-300 font-semibold">
                  ← Back to Blog
                </a>
              </div>
              
              <div class="text-sm text-gray-500 mb-4">
                {{ formatDate(blogPost.createdAt) }}
              </div>
              
              <h1 class="text-3xl md:text-5xl font-bold text-midnight-blue mb-6">
                {{ blogPost.title }}
              </h1>
              
              <div class="prose prose-lg max-w-none text-gray-700 mb-8" 
                   [innerHTML]="formatContent(blogPost.content)">
              </div>
              
              <div class="border-t pt-6">
                <h3 class="text-lg font-semibold text-midnight-blue mb-4">Share this article</h3>
                <div class="flex flex-col sm:flex-row gap-4">
                  <button 
                    (click)="shareToLinkedIn(blogPost)"
                    class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Share on LinkedIn
                  </button>
                  
                  <button 
                    (click)="copyShareLink()"
                    class="flex items-center gap-2 px-6 py-3 bg-midnight-blue text-white rounded-lg font-semibold hover:bg-blue-900 transition-all duration-300 hover:scale-105">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                    @if (linkCopied()) {
                      <span>{{ copyMessage() }}</span>
                    } @else {
                      <span>Copy Link</span>
                    }
                  </button>
                </div>
              </div>
            </div>
          </article>
        } @else {
          <div class="text-center py-20">
            <div class="text-6xl mb-4">❌</div>
            <h2 class="text-3xl font-bold text-gray-700 mb-4">Blog Post Not Found</h2>
            <p class="text-gray-500 mb-6">The article you're looking for doesn't exist.</p>
            <a routerLink="/blog" 
               class="inline-block bg-midnight-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-all duration-300">
              Back to Blog
            </a>
          </div>
        }
      </div>
    </div>
  `
})
export class BlogDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private firebaseService = inject(FirebaseService);
  
  private blogId = signal<string | null>(null);
  
  blog = computed(() => {
    const id = this.blogId();
    if (!id) return null;
    return this.firebaseService.getBlogById(id);
  });
  
  linkCopied = signal(false);
  copyMessage = signal('Link Copied!');
  
  constructor() {
    this.route.params.subscribe(params => {
      this.blogId.set(params['id']);
    });
  }
  
  formatDate(timestamp: any): string {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  formatContent(content: string): string {
    return content.replace(/\n/g, '<br>');
  }
  
  shareToLinkedIn(blog: Blog): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog.title);
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=600');
  }
  
  copyShareLink(): void {
    const shareLink = window.location.href;
    navigator.clipboard.writeText(shareLink).then(() => {
      this.linkCopied.set(true);
      setTimeout(() => {
        this.linkCopied.set(false);
      }, 2000);
    });
  }
}