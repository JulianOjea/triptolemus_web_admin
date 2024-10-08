import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

    private apiUrl = 'http://localhost:3000/questions';

    constructor(private http: HttpClient) {}
  
    // Obtener todas las Questions
    getQuestions(): Observable<Question[]> {
      return this.http.get<Question[]>(this.apiUrl);
    }
  
    // Añadir una nueva Question
    addQuestion(Question: Question): Observable<Question> {
      return this.http.post<Question>(this.apiUrl, Question);
    }
}
