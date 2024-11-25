// src/app/Questions/Questions.component.ts
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { CategoryService } from '../services/category.service';
import { Question } from '../models/question.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../models/category.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './Question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  
  Questions: Question[] = [];  // Array para almacenar las Questions
  newQuestion: Question = { text: '', category_name: '' }; // Para almacenar la nueva pregunta
  categories: Category[] = []; 
  faTrash = faTrash;

  constructor(private questionService: QuestionService, private categoryService: CategoryService) {}  // Inyecta el servicio

  ngOnInit(): void {
    this.obtenerQuestions();  // Llama al método para obtener Questions al iniciar el componente
    this.getCategory(); //con categorias iguial
  }

  obtenerQuestions(): void {
    this.questionService.getQuestions().subscribe((data: Question[]) => {
      this.Questions = data;  // Asigna las Questions obtenidas al array
    }, error => {
      console.error('Error al obtener las Questions:', error);  // Manejo de errores
    });
  }

  getCategory(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    }, error => {
      console.error('Error al obtener las categorías:', error);
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
  
  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reinicia el alto
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta el alto al contenido
  }

  deleteQuestion(questionId: number): void {
    this.questionService.deleteQuestion(questionId).subscribe({
      next: () => {
        this.Questions = this.Questions.filter(q => q.id !== questionId);
        console.log('Pregunta eliminada con éxito');
      },
      error: (error) => {
        console.error('Error al eliminar la pregunta:', error);
      },
    });
  }

  promptDelete(index: number): void {
    // Activa el estado de confirmación para la pregunta seleccionada
    this.Questions[index].confirmingDelete = true;
  }

  cancelDelete(index: number): void {
    // Cancela el estado de confirmación para la pregunta seleccionada
    this.Questions[index].confirmingDelete = false;
  }
}

