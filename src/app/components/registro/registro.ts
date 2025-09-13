import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://gyqjtqrbnkpksinxycat.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cWp0cXJibmtwa3Npbnh5Y2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyODQzMjIsImV4cCI6MjA3Mjg2MDMyMn0.vTO3WbkEV1qAJUJMQZfksudpN9cmvaKwKrUGthJ2-_g')

@Component({
  selector: 'app-registro',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  email = '';
  password = '';
  remember = false;
  mensajeColor = 'red';
  mensaje = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.mensaje = '';
  }

  registro(){
    supabase.auth.signUp({
      email: this.email,
      password: this.password,
    }).then(({data, error}) => {
      if(error){
        console.error('Error:', error.message);
        if(error.message.includes("already registered")){
          this.mensajeColor = 'red';
          this.mensaje = `❌ Ya se encuentra registrado!`;
        }else{
          this.mensajeColor = 'red';
          this.mensaje = `❌ Correo o contraseña incorrectos`;
        }
      }else{
        this.router.navigate(['/home']);
      }
    })
  }
}
