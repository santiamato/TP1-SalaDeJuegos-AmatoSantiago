import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorComponent } from '../error/error';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ErrorComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  // se guarda la info q se ingreso en el login
  errorObject: {
    email?: string;
    password?: string;
    tipo?: 'success' | 'supabase';
    mensaje?: string;
  } | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    this.errorObject = { email: this.email, password: this.password };

    if (!this.email || !this.password || this.password.length < 6) {
      return;
    }

    const { success, error } = await this.authService.login(this.email, this.password);

    //si hubo error actualiza el tipo de error a supabase, asi se puede mostrar el error correcto desde el compo error
    if (error) {
      this.errorObject = { tipo: 'supabase', mensaje: error.message };
    }

    if (success) {
      this.errorObject = { tipo: 'success' };
      this.router.navigate(['/home']);
    }
  }

}
