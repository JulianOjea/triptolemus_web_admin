import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  private apiUrl = environment.questionUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Obtener todas las Questions
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }

  // Añadir una nueva Question
  addQuestion(question: Question): Observable<Question> {
    const user_name = localStorage.getItem('user_name');
    const questionWithUser = {
      ...question,
      user_name,
    };
    return this.http.post<Question>(this.apiUrl, questionWithUser);
  }

  // Eliminar una Question por ID
  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/${question.id}`, question); 
  }
}
