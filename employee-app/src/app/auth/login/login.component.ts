import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private tokenService: TokenStorageService
  ) {}

  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        console.log('Token sauvegardé :', this.tokenService.getToken());
        this.router.navigate(['/employees']).then(result => {
          console.log('Navigation réussie ?', result);
        });
      },
      error: (err) => {
        console.error('Erreur login', err);
        this.errorMessage = 'Identifiants incorrects';
      }
    });
  }
}
