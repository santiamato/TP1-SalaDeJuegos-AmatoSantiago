import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './encuesta.html',
  styleUrls: ['./encuesta.css']
})
export class EncuestaComponent {
  usuario: string | null = null; 
  nombreApellido = '';
  edad: number | null = null;
  telefono = '';
  respuesta1 = '';
  respuesta2 = false; 
  respuesta3 = ''; 
  enviando = false;
  mensaje: { tipo: 'ok' | 'error'; texto: string } | null = null;

  constructor(private supabase: SupabaseService, private router: Router) {
    this.cargarUsuario();
  }

  async cargarUsuario() {
    try {
      const usr = await this.supabase.getUsuarioActual();
      if (!usr) {
        this.mensaje = { tipo: 'error', texto: 'Debes iniciar sesion para completar la encuesta' };
        return;
      }
      this.usuario = usr.email ?? usr.id ?? null;
    } catch (e) {
      this.mensaje = { tipo: 'error', texto: 'No se pudo obtener el usuario actual' };
    }
  }

  onTelefonoInput(ev: Event) {
    const target = ev.target as HTMLInputElement;
    let value = (target.value || '').replace(/\D+/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    this.telefono = value;
  }

  get edadValida() {
    if (this.edad === null || this.edad === undefined) return false;
    return this.edad >= 18 && this.edad <= 99;
  }

  get telefonoValido() {
    return /^\d{8,10}$/.test(this.telefono);
  }

  get checkboxValido() {
    return this.respuesta2 === true || this.respuesta2 === false;
  }
  get radioValido() {
    return this.respuesta3 !== '';
  }

  marcarCamposComoTocados(form: NgForm) {
    Object.values(form.controls).forEach(c => c.markAsTouched());
  }

  async enviar(form: NgForm) {
    this.mensaje = null;

    if (!this.usuario) {
      this.mensaje = { tipo: 'error', texto: 'Inicia sesion para enviar la encuesta' };
      return;
    }

    const validoTemplate = form.valid;
    const validoCustom = this.edadValida && this.telefonoValido && this.checkboxValido && this.radioValido;
    if (!validoTemplate || !validoCustom) {
      this.marcarCamposComoTocados(form);
      this.mensaje = { tipo: 'error', texto: 'Revisa los campos: hay errores de validacion' };
      return;
    }

    this.enviando = true;
    try {
      await this.supabase.guardarEncuesta({
        usuario: this.usuario,
        nombre_apellido: this.nombreApellido.trim(),
        edad: this.edad as number,
        telefono: this.telefono,
        respuesta1: this.respuesta1.trim(),
        respuesta2: this.respuesta2,
        respuesta3: this.respuesta3,
      });

      this.mensaje = { tipo: 'ok', texto: 'Gracias, Respuestas guardadas' };
      form.resetForm();
      this.respuesta2 = false;
    } catch (e: any) {
      this.mensaje = { tipo: 'error', texto: e?.message || 'No se pudo guardar la encuesta' };
    } finally {
      this.enviando = false;
    }
  }
}
