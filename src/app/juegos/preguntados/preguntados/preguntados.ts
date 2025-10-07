import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ServicioPreguntas, Pregunta } from '../../../services/preguntas';
import { Navbar } from '../../../components/navbar/navbar';

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

  opcionSeleccionada?: string;
  esCorrecta = false;
  mostrarContinuar = false;
  respuestaBloqueada = false;

  constructor(private trivia: ServicioPreguntas) {}

  ngOnInit() {
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
        alert('Error al cargar la pregunta');
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
    this.cargarPregunta();
  }
}
