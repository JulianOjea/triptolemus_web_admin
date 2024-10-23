import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  error: string = '';
  success: boolean = false;

  constructor(private authService: AuthService) {}

  onLogin(){
    this.loading = true;
    this.error = '';
    this.success = false;

    this.authService.login(this.username, this.password).subscribe({
      next: (isValid) => {
        this.loading = false;
        if (isValid) {
          this.success = true;
          console.log('Login exitoso');
        } else {
          this.error = 'Usuario o contraseña incorrectos';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error en el servidor';
        console.error('Error:', err);
      }
    });
  }
  
}
