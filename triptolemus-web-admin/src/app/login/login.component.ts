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

  async onLogin() {
    this.loading = true;
    this.error = '';
    this.success = false;

    try {
      // Llamada a login usando async/await
      await this.authService.login(this.username, this.password);
      this.loading = false;
      this.success = true;
      console.log('Login exitoso');
    } catch (err) {
      this.loading = false;
      this.error = 'Usuario o contraseña incorrectos';
      console.error('Error en el login:', err);
    }
  }
  
}
