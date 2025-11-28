import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private tokenService: TokenStorageService) {}

  canActivate(): boolean {
    const token = this.tokenService.getToken(); // utilise la même clé que le service
    if (token) {
      return true; // connecté → accès autorisé
    } else {
      this.router.navigate(['/login']); // pas connecté → renvoi vers login
      return false;
    }
  }
}
