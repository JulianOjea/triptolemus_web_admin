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
  loginError: string = '';
  success: boolean = false;

  constructor(private authService: AuthService) {}

  async onLogin() {
    this.loading = true;
    this.loginError = '';
    this.success = false;

    try {
      await this.authService.login(this.username, this.password);
      this.loading = false;
      this.success = true;
    } catch (err) {
      this.loading = false;
      this.loginError = 'Usuario o contraseña incorrectos';
    }
  }
}
