// src/app/pages/admin/admin.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService, Blog, FAQ } from '../../services/firebase.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private firebaseService = inject(FirebaseService);
  
  // Signals for UI state
  activeTab = signal<'blogs' | 'faqs'>('blogs');
  editingBlog = signal<Blog | null>(null);
  editingFAQ = signal<FAQ | null>(null);
  loading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');
  
  // Data from Firebase
  blogs = this.firebaseService.blogs;
  faqs = this.firebaseService.faqs;
  currentUser = this.firebaseService.currentUser;
  
  // Forms
  blogForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    content: ['', [Validators.required, Validators.minLength(20)]],
    imageUrl: ['']
  });
  
  blogImage = signal<File | null>(null);
  blogImagePreview = signal<string>('');
  
  faqForm = this.fb.group({
    question: ['', [Validators.required, Validators.minLength(5)]],
    answer: ['', [Validators.required, Validators.minLength(10)]]
  });
  
  // Tab switching
  setActiveTab(tab: 'blogs' | 'faqs'): void {
    this.activeTab.set(tab);
    this.cancelEdit();
  }
  
  // Blog operations
  startEditBlog(blog: Blog): void {
    this.editingBlog.set(blog);
    this.blogForm.patchValue({
      title: blog.title,
      content: blog.content,
      imageUrl: blog.imageUrl || ''
    });
  }
  
  async submitBlog(): Promise<void> {
    if (this.blogForm.invalid) return;
    
    this.loading.set(true);
    this.clearMessages();
    
    try {
      const formValue = this.blogForm.value;
      const blogData = {
        title: formValue.title!,
        content: formValue.content!,
        imageUrl: formValue.imageUrl || undefined,
        createdAt: new Date()
      };
      
      const editing = this.editingBlog();
      if (editing && editing.id) {
        await this.firebaseService.updateBlog(editing.id, blogData);
        this.successMessage.set('Blog post updated successfully!');
      } else {
        await this.firebaseService.addBlog(blogData);
        this.successMessage.set('Blog post created successfully!');
      }
      
      this.blogForm.reset();
      this.editingBlog.set(null);
    } catch (error) {
      this.errorMessage.set('Failed to save blog post. Please try again.');
    } finally {
      this.loading.set(false);
      this.autoHideMessages();
    }
  }
  
  async deleteBlog(id: string): Promise<void> {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    this.loading.set(true);
    this.clearMessages();
    
    try {
      await this.firebaseService.deleteBlog(id);
      this.successMessage.set('Blog post deleted successfully!');
    } catch (error) {
      this.errorMessage.set('Failed to delete blog post. Please try again.');
    } finally {
      this.loading.set(false);
      this.autoHideMessages();
    }
  }
  
  // FAQ operations
  startEditFAQ(faq: FAQ): void {
    this.editingFAQ.set(faq);
    this.faqForm.patchValue({
      question: faq.question,
      answer: faq.answer
    });
  }
  
  async submitFAQ(): Promise<void> {
    if (this.faqForm.invalid) return;
    
    this.loading.set(true);
    this.clearMessages();
    
    try {
      const formValue = this.faqForm.value;
      const faqData = {
        question: formValue.question!,
        answer: formValue.answer!,
        createdAt: new Date()
      };
      
      const editing = this.editingFAQ();
      if (editing && editing.id) {
        await this.firebaseService.updateFAQ(editing.id, faqData);
        this.successMessage.set('FAQ updated successfully!');
      } else {
        await this.firebaseService.addFAQ(faqData);
        this.successMessage.set('FAQ created successfully!');
      }
      
      this.faqForm.reset();
      this.editingFAQ.set(null);
    } catch (error) {
      this.errorMessage.set('Failed to save FAQ. Please try again.');
    } finally {
      this.loading.set(false);
      this.autoHideMessages();
    }
  }
  
  async deleteFAQ(id: string): Promise<void> {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    
    this.loading.set(true);
    this.clearMessages();
    
    try {
      await this.firebaseService.deleteFAQ(id);
      this.successMessage.set('FAQ deleted successfully!');
    } catch (error) {
      this.errorMessage.set('Failed to delete FAQ. Please try again.');
    } finally {
      this.loading.set(false);
      this.autoHideMessages();
    }
  }
  
  cancelEdit(): void {
    this.editingBlog.set(null);
    this.editingFAQ.set(null);
    this.blogForm.reset();
    this.faqForm.reset();
    this.clearMessages();
  }
  
  async logout(): Promise<void> {
    try {
      await this.firebaseService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  
  private clearMessages(): void {
    this.successMessage.set('');
    this.errorMessage.set('');
  }
  
  private autoHideMessages(): void {
    setTimeout(() => {
      this.clearMessages();
    }, 5000);
  }
  
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