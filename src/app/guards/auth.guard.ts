// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { interval, map, switchMap, takeWhile } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const firebaseService = inject(FirebaseService);
  const router = inject(Router);

  // Poll until Firebase auth is initialized
  return interval(100).pipe(
    // Keep checking until authInitialized() becomes true
    takeWhile(() => !firebaseService.authInitialized(), true),

    // Once initialized, switch to authentication check
    switchMap(() => {
      const isAuth = firebaseService.isAuthenticated();

      if (isAuth) {
        console.log('Auth guard: User authenticated');
        return [true];
      } else {
        console.log('Auth guard: User not authenticated, redirecting to login');
        router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }
        });
        return [false];
      }
    })
  );
};
