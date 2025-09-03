import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  email = '';
  password = '';
  remember = false;

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Recordarme:', this.remember);
  }
}

