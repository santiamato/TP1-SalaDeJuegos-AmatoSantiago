import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ServicioPreguntas, Pregunta } from '../../../services/preguntas';
import { Navbar } from '../../../components/navbar/navbar';
import { SupabaseService } from '../../../services/supabase';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.html',
  styleUrls: ['./preguntados.css'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatCardModule, Navbar]
})
export class Preguntados implements OnInit {
  pregunta?: Pregunta;
  cargando = false;
  puntaje = 0;
  totalPreguntas = 4; 
  respondidas = 0;

  opcionSeleccionada?: string;
  esCorrecta = false;
  mostrarContinuar = false;
  respuestaBloqueada = false;

  constructor(private trivia: ServicioPreguntas, private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.puntaje = 0;
    this.respondidas = 0;
    this.cargarPregunta();
  }

  cargarPregunta() {
    this.cargando = true;
    this.trivia.obtenerPregunta().subscribe({
      next: (p) => {
        this.pregunta = {
          pregunta: p.pregunta,
          correcta: p.correcta,
          opciones: p.opciones,
          imagen: `https://backend-tpsalajuegos-amato-production.up.railway.app/public/${p.imagen}`
        };
        this.cargando = false;
        this.opcionSeleccionada = undefined;
        this.mostrarContinuar = false;
        this.respuestaBloqueada = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  responder(opcion: string) {
    if (!this.pregunta) return;

    this.opcionSeleccionada = opcion;
    this.esCorrecta = opcion === this.pregunta.correcta;
    this.respuestaBloqueada = true;

    if (this.esCorrecta) this.puntaje++;

    setTimeout(() => {
      this.mostrarContinuar = true;
    }, 600);
  }

  siguientePregunta() {
    this.mostrarContinuar = false;
    this.respondidas++;
    if (this.respondidas >= this.totalPreguntas) {
      this.respuestaBloqueada = true;
      this.cargando = false;
      this.guardarResultado();
      return;
    }
    this.cargarPregunta();
  }
  
  private async guardarResultado() {
    const user = await this.supabaseService.getUsuarioActual();
    if (!user) return;
    const email = user.email || 'desconocido';
    try {
      await this.supabaseService.guardarResultado(email, 'preguntados', this.puntaje);
    } catch (e) {
      console.error('Error guardando resultado (preguntados):', e);
    }
  }
}
