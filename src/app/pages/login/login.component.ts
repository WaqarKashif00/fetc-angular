// src/app/pages/login/login.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div class="max-w-md w-full">
        <div class="bg-white rounded-lg shadow-lg p-8 animate-on-scroll">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-midnight-blue mb-2">Admin Login</h2>
            <p class="text-gray-600">Sign in to manage your content</p>
          </div>
          
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="space-y-4">
              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email"
                  formControlName="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                  placeholder="admin@fetc.ae">
                @if (loginForm.get('email')?.touched && loginForm.get('email')?.hasError('required')) {
                  <p class="text-red-500 text-sm mt-1">Email is required</p>
                }
                @if (loginForm.get('email')?.touched && loginForm.get('email')?.hasError('email')) {
                  <p class="text-red-500 text-sm mt-1">Invalid email format</p>
                }
              </div>
              
              <div>
                <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input 
                  type="password" 
                  id="password"
                  formControlName="password"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                  placeholder="Enter your password">
                @if (loginForm.get('password')?.touched && loginForm.get('password')?.hasError('required')) {
                  <p class="text-red-500 text-sm mt-1">Password is required</p>
                }
              </div>
              
              @if (errorMessage()) {
                <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {{ errorMessage() }}
                </div>
              }
              
              <button 
                type="submit"
                [disabled]="loading() || loginForm.invalid"
                class="w-full bg-midnight-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                @if (loading()) {
                  <span>Signing in...</span>
                } @else {
                  <span>Sign In</span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private firebaseService = inject(FirebaseService);
  
  loading = signal(false);
  errorMessage = signal('');
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return;
    
    this.loading.set(true);
    this.errorMessage.set('');
    
    const { email, password } = this.loginForm.value;
    
    try {
      await this.firebaseService.login(email!, password!);
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
      this.router.navigate([returnUrl]);
    } catch (error: any) {
      this.errorMessage.set('Invalid email or password. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}