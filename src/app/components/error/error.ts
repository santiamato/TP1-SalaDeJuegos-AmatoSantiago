import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.html'
})
export class ErrorComponent {
  // Va a ser de hijo, para las clases q necesiten usar los errores, si el padre no le pasa nada se limpia el msj
  @Input() set error(value: { email?: string, password?: string, tipo?: 'success' | 'supabase', mensaje?: string } | null) {
    if (!value) {
      this.mensaje = '';
      return;
    }

    if (value.email === '' && value.password === '') {
      this.mensaje = "Completa los campos email y contraseña";
      this.color = 'red';
      return;
    }
    if (value.email === '') {
      this.mensaje = "El campo email es obligatorio";
      this.color = 'red';
      return;
    }
    if (value.password === '') {
      this.mensaje = "El campo contraseña es obligatorio";
      this.color = 'red';
      return;
    }
    if (value.password && value.password.length < 6) {
      this.mensaje = "La contraseña debe tener al menos 6 caracteres";
      this.color = 'orange';
      return;
    }

    // errores de supa
    if (value.tipo === 'supabase') {
      const mensajeError = value.mensaje?.toLowerCase() || '';
      if (mensajeError.includes("already") && mensajeError.includes("registered")) {
        this.mensaje = "Ya se encuentra registrado!";
        this.color = 'red';
      } else if (mensajeError.includes("invalid login")) {
        this.mensaje = "Correo o contraseña incorrectos";
        this.color = 'red';
      } else {
        this.mensaje = `${value.mensaje}`;
        this.color = 'red';
      }
      return;
    }

    if (value.tipo === 'success') {
      this.mensaje = "✅ Operación exitosa!";
      this.color = 'green';
      return;
    }
  }

  mensaje: string = '';
  color: string = 'red';
}
