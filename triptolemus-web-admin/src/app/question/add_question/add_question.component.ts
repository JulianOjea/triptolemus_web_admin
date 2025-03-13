import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { Category } from '../../models/category.model';
import { Question } from '../../models/question.model';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../services/question.service';
import { LogoutComponent } from "../logout/logout.component";

@Component({
  selector: 'app-add_question',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, CommonModule, LogoutComponent],
  templateUrl: './add_question.component.html',
  styleUrls: ['./add_question.component.css']
})

export class Add_questionComponent{ 

  constructor(private categoryService: CategoryService, private questionService: QuestionService) { }

  @Input() categories: Category[] = [];
  @Output() questionAdded = new EventEmitter<Question>();
  
  newQuestion: Question = { text_es: '', text_eng: '', category_name: '' };

  ngOnInit(): void {
    this.getCategories();
  }

  autoResize(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  }

  onSubmit() {
    if (this.newQuestion.text_es && this.newQuestion.category_name) {
      this.questionService.addQuestion(this.newQuestion).subscribe({
        next: (response) => {
          this.questionAdded.emit(response);
          this.newQuestion = { text_es: '', text_eng: '', category_name: '' };
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
}
