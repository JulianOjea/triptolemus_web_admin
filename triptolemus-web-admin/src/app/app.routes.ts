import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'question', component: QuestionComponent, canActivate: [AuthGuard] },
    { path: 'not-found', component: NotFoundComponent },
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];
