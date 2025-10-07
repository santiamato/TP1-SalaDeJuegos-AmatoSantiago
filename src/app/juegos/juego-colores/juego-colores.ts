import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-juego-colores',
  templateUrl: './juego-colores.html',
  styleUrls: ['./juego-colores.css'],
  imports: [CommonModule, Navbar]
})
export class JuegoColores {
  colores: string[] = ['rojo', 'azul', 'verde', 'amarillo'];

  secuencia: string[] = [];
  inputJugador: string[] = [];

  jugando = false;
  puedeJugar = false;
  mejorPuntaje = 0;

  async iniciarJuego() {
    this.secuencia = [];
    this.inputJugador = [];
    this.jugando = true;
    this.puedeJugar = false;

    await this.agregarColor();
  }

  async agregarColor() {
    const randomColor = this.colores[Math.floor(Math.random() * this.colores.length)];
    this.secuencia.push(randomColor);
    this.inputJugador = [];

    //mostrar secuencia al jugador
    this.puedeJugar = false;
    for (let i = 0; i < this.secuencia.length; i++) {
      await this.destacarColor(this.secuencia[i]);
    }
    this.puedeJugar = true;
  }

  async destacarColor(color: string) {
    return new Promise<void>(resolve => {
      const btn = document.querySelector(`.${color}`);
      btn?.classList.add('active');
      setTimeout(() => {
        btn?.classList.remove('active');
        setTimeout(resolve, 300);
      }, 600);
    });
  }

  async seleccionar(color: string) {
    if (!this.puedeJugar) return;

    this.inputJugador.push(color);
    const index = this.inputJugador.length - 1;

    if (this.inputJugador[index] !== this.secuencia[index]) {
      this.jugando = false;
      this.puedeJugar = false;
      alert(`¡Fallaste! Puntaje: ${this.secuencia.length - 1}`);
      this.mejorPuntaje = Math.max(this.mejorPuntaje, this.secuencia.length - 1);

      return;
    }

    if (this.inputJugador.length === this.secuencia.length) {
      await this.agregarColor();
    }
  }
}
