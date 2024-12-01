// src/app/Questions/Questions.component.ts
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { CategoryService } from '../services/category.service';
import { Question } from '../models/question.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../models/category.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPen} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { Add_questionComponent } from './add_question/add_question.component';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, Add_questionComponent],
  templateUrl: './Question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  
  Questions: Question[] = [];  // Array para almacenar las Questions
  newQuestion: Question = { text: '', category_name: '' }; // Para almacenar la nueva pregunta
  categories: Category[] = []; 

  filteredQuestions: Question[] = [];
  searchTerm: string = '';

  //icons
  faTrash = faTrash;
  faPen = faPen;

  constructor(private questionService: QuestionService, private categoryService: CategoryService, private authService : AuthService) {}  // Inyecta el servicio

  handleNewQuestion(question: Question) {
    this.Questions.push(question); // Añade la pregunta a tu lista
  }

  ngOnInit(): void {
    this.obtenerQuestions();  // Llama al método para obtener Questions al iniciar el componente
  }

  obtenerQuestions(): void {
    this.questionService.getQuestions().subscribe((data: Question[]) => {
      this.Questions = data;  // Asigna las Questions obtenidas al array
      this.filteredQuestions = data; // Inicializamos filteredQuestions con todas las preguntas
    }, error => { 
      console.error('Error al obtener las Questions:', error);  // Manejo de errores
    });
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
        this.filteredQuestions = this.Questions;
        this.searchTerm = '';
        console.log('Pregunta eliminada con éxito');
      },
      error: (error) => {
        console.error('Error al eliminar la pregunta:', error);
      },
    });
  }

  promptDelete(questionId: number | undefined): void {
    if (questionId === undefined) {
      console.error('El id de la pregunta no está definido');
      return; // Termina la ejecución si no hay id
    }
    const question = this.Questions.find(q => q.id === questionId);
    if (question) {
      question.confirmingDelete = true;
    }
  }

  cancelDelete(questionId: number): void {
    const question = this.Questions.find(q => q.id === questionId);
    if (question) {
      question.confirmingDelete = false;
    }
  }

  loadQuestions() {
  this.questionService.getQuestions().subscribe((questions) => {
    this.Questions = questions.map((q) => ({ ...q, isEditing: false, confirmingDelete: false }));
    this.filteredQuestions = this.Questions; // Actualiza también filteredQuestions
  });
}

  startEdit(questionId: number) {
    const question = this.Questions.find(q => q.id === questionId);
  if (question) {
    question.isEditing = true;
  }
  }

  cancelEdit(questionId: number): void {
    const question = this.Questions.find(q => q.id === questionId);
    if (question) {
      question.isEditing = false;
      this.loadQuestions(); // Recargar preguntas para descartar cambios
      this.searchTerm = "";
    }
  }

  saveEdit(question: Question): void {
    const category = this.categories.find((cat) => cat.id === question.category_id);
    if (!category) {
      console.error('Categoría no encontrada para el id:', question.category_id);
      return;
    }
  
    this.questionService.updateQuestion({
      id: question.id,
      text: question.text, 
      category_name: category.name
    }).subscribe((updatedQuestion) => {
      const index = this.Questions.findIndex((q) => q.id === updatedQuestion.id);
      if (index !== -1) {
        this.Questions[index] = { ...updatedQuestion, isEditing: false };
      }

      this.loadQuestions(); 
    });
  }

  filterQuestions(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredQuestions = this.Questions;
    } else {
      this.filteredQuestions = this.Questions.filter(question =>
        question.text.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  onSearchChange(): void {
    this.filterQuestions();
  }

  
}

