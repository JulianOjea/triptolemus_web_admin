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

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, Add_questionComponent],
  templateUrl: './Question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  
  Questions: Question[] = []; //Stores questions
  categories: Category[] = []; 

  filteredQuestions: Question[] = []; //Auxiliar list used to filter questions
  searchTerm: string = '';

  //icons
  faTrash = faTrash;
  faPen = faPen;

  constructor(private questionService: QuestionService) {}

  //Adds new question from add_question component
  handleNewQuestion(question: Question) {
    this.Questions.push(question);
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.getQuestions().subscribe({
      next: (data: Question[]) => {
        this.Questions = data;
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
        this.Questions = this.Questions.filter(q => q.id !== questionId);
        this.filteredQuestions = this.Questions;
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
    const question = this.Questions.find(q => q.id === questionId);
    if (question) {
      question.isDeleting = true;
    }
  }

  cancelDelete(questionId: number): void {
    const question = this.Questions.find(q => q.id === questionId);
    if (question) {
      question.isDeleting = false;
    }
  }

  loadQuestions() {
  this.questionService.getQuestions().subscribe((questions) => {
    this.Questions = questions.map((q) => ({ ...q, isEditing: false, confirmingDelete: false }));
    this.filteredQuestions = this.Questions;
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

