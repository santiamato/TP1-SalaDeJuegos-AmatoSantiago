import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorComponent } from '../error/error';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ErrorComponent, CommonModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
})
export class Registro {
  email = '';
  password = '';
  errorObject: any = null;

  constructor(private router: Router, private authService: AuthService) {}

  async registro() {
    this.errorObject = { email: this.email, password: this.password };

    if (!this.email || !this.password || this.password.length < 6) return;

    const result = await this.authService.registrar(this.email, this.password);

    this.errorObject = result.error
      ? { tipo: 'supabase', mensaje: result.error.message, email: this.email, password: this.password }
      : { tipo: 'success', email: this.email, password: this.password };

    if (!result.error) this.router.navigate(['/home']);

  }
}
