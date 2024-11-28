import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

    private apiUrl = 'http://localhost:3000/questions';

    constructor(private http: HttpClient, private authService: AuthService) {}

    // Obtener todas las Questions
    getQuestions(): Observable<Question[]> {
      const headers = this.authService.getAuthHeaders();
      return this.http.get<Question[]>(this.apiUrl, { headers });
    }
  
    // Añadir una nueva Question
    addQuestion(question: Question): Observable<Question> {
      const headers = this.authService.getAuthHeaders();
      return this.http.post<Question>(this.apiUrl, question, { headers });
    }

  // Eliminar una Question por ID
  deleteQuestion(id: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  updateQuestion(question: Question): Observable<Question> {
    const url = `${this.apiUrl}/${question.id}`;
    const headers = this.authService.getAuthHeaders();
    console.log("AQUIIUI");
    console.log(url);
    console.log(headers);
    return this.http.put<Question>(url, question, { headers }); 
  }
}
