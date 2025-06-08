// src/app/Questions/Questions.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPen} from '@fortawesome/free-solid-svg-icons';

import { Question } from '../models/question.model';
import { Category } from '../models/category.model';
import { QuestionService } from '../services/question.service';
import { Add_questionComponent } from './add_question/add_question.component';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, Add_questionComponent],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  
  questions: Question[] = []; //Stores questions
  categories: Category[] = []; 

  filteredQuestions: Question[] = []; //Auxiliar list used to filter questions
  searchTerm: string = '';

  //icons
  faTrash = faTrash;
  faPen = faPen;

  constructor(private questionService: QuestionService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getQuestions();
    this.getCategories();
  }

  //Adds new question from add_question component
  handleNewQuestion(question: Question) {
    this.questions.push(question);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (error: any) => {
        console.error('Error al obtener las categorías:', error);
      }
    })
  }

  getQuestions(): void {
    this.questionService.getQuestions().subscribe({
      next: (data: Question[]) => {
        this.questions = data;
        this.filteredQuestions = data; 
      },
      error: (error) => {
        console.error('Error al obtener las Questions:', error);
      }
    });
  }
  
  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  deleteQuestion(questionId: number): void {
    this.questionService.deleteQuestion(questionId).subscribe({
      next: () => {
        this.questions = this.questions.filter(q => q.id !== questionId);
        this.filteredQuestions = this.questions;
        this.searchTerm = '';
      },
      error: (error) => {
        console.error('Error al eliminar la pregunta:', error);
      },
    });
  }

  promptDelete(questionId: number | undefined): void {
    if (questionId === undefined) {
      return;
    }
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      question.isDeleting = true;
    }
  }

  cancelDelete(questionId: number): void {
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      question.isDeleting = false;
    }
  }

  loadQuestions() {
  this.questionService.getQuestions().subscribe((questions) => {
    this.questions = questions.map((q) => ({ ...q, isEditing: false, confirmingDelete: false }));
    this.filteredQuestions = this.questions;
  });
}

  startEdit(questionId: number) {
    const question = this.questions.find(q => q.id === questionId);
  if (question) {
    question.isEditing = true;
  }
  }

  cancelEdit(questionId: number): void {
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      question.isEditing = false;
      this.loadQuestions();
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
      text_es: question.text_es, 
      text_eng: question.text_eng,
      category_name: category.name
    }).subscribe((updatedQuestion) => {
      const index = this.questions.findIndex((q) => q.id === updatedQuestion.id);
      if (index !== -1) {
        this.questions[index] = { ...updatedQuestion, isEditing: false };
      }

      this.loadQuestions(); 
    });
  }

  // TODO el texto solo busca por español idgaf
  filterQuestions(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredQuestions = this.questions;
    } else {
      this.filteredQuestions = this.questions.filter(question =>
        question.text_es.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        question.text_eng.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  onSearchChange(): void {
    this.filterQuestions();
  }
}

