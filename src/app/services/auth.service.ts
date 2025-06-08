import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  async login(username: string, password: string): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.http.post<any>(environment.loginUrl, { username, password })
      );
      
      localStorage.setItem(this.tokenKey, response.token);
      localStorage.setItem('user_name', username);
      
      this.router.navigate(['question']);
    } catch (error) {
      throw new Error('Usuario o contraseña incorrectos');
    }
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user_name');
    this.router.navigate(['/login']);
  }
}
