// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.categoryUrl;  // URL del backend para categorías

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Obtener categorías dinámicamente
  getCategories(): Observable<Category[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Category[]>(this.apiUrl, { headers });
  }
}