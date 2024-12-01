import { Component, Input, Output, EventEmitter } from '@angular/core';
import {faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Category } from '../../models/category.model';
import { Question } from '../../models/question.model';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-add_question',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './add_question.component.html',
  styleUrls: ['./add_question.component.css']
})

export class Add_questionComponent{ 

  constructor(private categoryService: CategoryService, private questionService: QuestionService) { }

  @Input() categories: Category[] = [];
  @Output() questionAdded = new EventEmitter<Question>();
  
  newQuestion: Question = { text: '', category_name: '' };

  faSignOutAlt = faSignOutAlt;

  ngOnInit(): void {
    this.getCategories();
  }

  autoResize(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  }

  onSubmit() {
    console.log('Enviando nueva pregunta:', this.newQuestion);
    if (this.newQuestion.text && this.newQuestion.category_name) {
      this.questionService.addQuestion(this.newQuestion).subscribe({
        next: (response) => {
          this.questionAdded.emit(response);
          this.newQuestion = { text: '', category_name: '' };
        },
        error: (error) => {
          console.error('Error al agregar pregunta', error);
        }
    });
    }
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

  logout() {
    inject(AuthService).logout();
  }
}
