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
  uploadingImage = signal(false);
  successMessage = signal('');
  errorMessage = signal('');
  
  // Data from Firebase
  blogs = this.firebaseService.blogs;
  faqs = this.firebaseService.faqs;
  currentUser = this.firebaseService.currentUser;
  
  // Image handling
  blogImage = signal<File | null>(null);
  blogImagePreview = signal<string>('');
  
  // Forms
  blogForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    content: ['', [Validators.required, Validators.minLength(20)]],
    imageUrl: ['']
  });
  
  faqForm = this.fb.group({
    question: ['', [Validators.required, Validators.minLength(5)]],
    answer: ['', [Validators.required, Validators.minLength(10)]]
  });
  
  // Tab switching
  setActiveTab(tab: 'blogs' | 'faqs'): void {
    this.activeTab.set(tab);
    this.cancelEdit();
  }
  
  // Image handling
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.errorMessage.set('Please select an image file (PNG, JPG, GIF)');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage.set('Image size must be less than 5MB');
        return;
      }
      
      this.blogImage.set(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.blogImagePreview.set(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear the imageUrl field when file is selected
      this.blogForm.patchValue({ imageUrl: '' });
    }
  }
  
  removeImage(): void {
    this.blogImage.set(null);
    this.blogImagePreview.set('');
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  
  // Blog operations
  startEditBlog(blog: Blog): void {
    this.editingBlog.set(blog);
    this.blogForm.patchValue({
      title: blog.title,
      content: blog.content,
      imageUrl: blog.imageUrl || ''
    });
    if (blog.imageUrl) {
      this.blogImagePreview.set(blog.imageUrl);
    }
    // Scroll to form
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }
  
  async submitBlog(): Promise<void> {
    if (this.blogForm.invalid) {
      this.errorMessage.set('Please fill in all required fields');
      return;
    }
    
    this.loading.set(true);
    this.clearMessages();
    
    try {
      const formValue = this.blogForm.value;
      const imageFile = this.blogImage();
      const imageUrl = formValue.imageUrl;
      
      // Check if we have either a file or URL
      if (!imageFile && !imageUrl) {
        this.errorMessage.set('Please provide an image (upload file or enter URL)');
        this.loading.set(false);
        return;
      }
      
      const blogData = {
        title: formValue.title!,
        content: formValue.content!,
        imageUrl: imageUrl || '',
        createdAt: new Date()
      };
      
      const editing = this.editingBlog();
      
      if (imageFile) {
        // Upload image file
        this.uploadingImage.set(true);
        
        if (editing && editing.id) {
          await this.firebaseService.updateBlog(editing.id, blogData, imageFile);
          this.successMessage.set('Blog post updated successfully with new image!');
        } else {
          await this.firebaseService.addBlog(blogData, imageFile);
          this.successMessage.set('Blog post created successfully with uploaded image!');
        }
        
        this.uploadingImage.set(false);
      } else {
        // Use URL
        if (editing && editing.id) {
          await this.firebaseService.updateBlog(editing.id, blogData);
          this.successMessage.set('Blog post updated successfully!');
        } else {
          await this.firebaseService.addBlog(blogData);
          this.successMessage.set('Blog post created successfully!');
        }
      }
      
      this.blogForm.reset();
      this.editingBlog.set(null);
      this.removeImage();
    } catch (error: any) {
      console.error('Error saving blog:', error);
      this.errorMessage.set(`Failed to save blog post: ${error.message || 'Please try again'}`);
    } finally {
      this.loading.set(false);
      this.uploadingImage.set(false);
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
    // Scroll to form
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
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
    this.removeImage();
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