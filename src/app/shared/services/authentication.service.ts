import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface GoogleAccount {
  idToken: string;
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  provider: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {
    this.initializeAuthStateListener();
  }

  private initializeAuthStateListener() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.handleLogin(user);
      }
    });
  }

  private handleLogin(user: GoogleAccount) {
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    this.router.navigate(['home']);
  }

  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.socialAuthService.signOut();
    this.router.navigate(['/']);
  }
}