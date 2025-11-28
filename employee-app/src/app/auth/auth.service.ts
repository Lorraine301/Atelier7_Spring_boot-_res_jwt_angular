import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {}

  login(username: string, password: string) {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, {username, password})
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.token);
        })
      );
  }

  logout() {
    this.tokenService.clear();
  }

  isLogged(): boolean {
    return this.tokenService.getToken() != null;
  }
}
