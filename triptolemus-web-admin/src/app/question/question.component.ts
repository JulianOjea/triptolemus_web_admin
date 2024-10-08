// src/app/Questions/Questions.component.ts
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Question.component.html',
  styleUrls: ['./Question.component.css']
})

export class QuestionComponent implements OnInit {
  
  Questions: Question[] = [];  // Array para almacenar las Questions
  newQuestion: Question = { text: '', category_name: '' }; // Para almacenar la nueva pregunta

  constructor(private questionService: QuestionService) {}  // Inyecta el servicio

  ngOnInit(): void {
    console.log("hey")  ;
    this.obtenerQuestions();  // Llama al método para obtener Questions al iniciar el componente
  }

  obtenerQuestions(): void {
    this.questionService.getQuestions().subscribe((data: Question[]) => {
      this.Questions = data;  // Asigna las Questions obtenidas al array
    }, error => {
      console.error('Error al obtener las Questions:', error);  // Manejo de errores
    });
  }

  onSubmit() {
    console.log('Enviando nueva pregunta:', this.newQuestion);
    if (this.newQuestion.text && this.newQuestion.category_name) {
      this.questionService.addQuestion(this.newQuestion).subscribe({
        next: (response) => {
          // Puedes agregar la nueva pregunta a la lista localmente si lo deseas
          this.Questions.push(response); // Agregar la pregunta recién creada a la lista
          this.newQuestion = { text: '', category_name: '' }; // Reiniciar el formulario
        },
        error: (error) => {
          console.error('Error al agregar pregunta', error);
        }
    });
    }
  }
}
