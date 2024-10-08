// src/app/Questions/Questions.component.ts
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Question.component.html',
  styleUrls: ['./Question.component.css']
})

export class QuestionComponent implements OnInit {
  
  Questions: Question[] = [];  // Array para almacenar las Questions

  constructor(private QuestionService: QuestionService) {}  // Inyecta el servicio

  ngOnInit(): void {
    console.log("hey")  ;
    this.obtenerQuestions();  // Llama al método para obtener Questions al iniciar el componente
  }

  obtenerQuestions(): void {
    this.QuestionService.getQuestions().subscribe((data: Question[]) => {
      this.Questions = data;  // Asigna las Questions obtenidas al array
    }, error => {
      console.error('Error al obtener las Questions:', error);  // Manejo de errores
    });
  }
}
