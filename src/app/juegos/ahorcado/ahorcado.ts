import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.html',
  styleUrls: ['./ahorcado.css'],
  imports: [Navbar, CommonModule, RouterModule]
})
export class Ahorcado implements OnInit {
  palabras: string[] = [
    'computadora', 'nommbre', 'casa', 'banana', 'css', 
    'palabra', 'utn', 'avellaneda'
  ];
  palabraMostrada: string[] = [];
  letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  letrasUsadas: string[] = [];
  intentos = 6;
  palabraSecreta = this.elegirPalabraAleatoria()
  juegoGanado = false;
  juegoPerdido = false;
  juegoTerminado = false;

  ngOnInit() {
    this.iniciarJuego();
  }

  elegirPalabraAleatoria(): string {
    const indice = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[indice].toUpperCase(); 
  }
  iniciarJuego() {
    this.palabraMostrada = Array(this.palabraSecreta.length).fill('_');
    this.letrasUsadas = [];
    this.intentos = 6;
    this.juegoGanado = false;
    this.juegoPerdido = false;
    this.juegoTerminado = false;
  }

  elegirLetra(letra: string) {
    if (this.juegoTerminado) return;

    this.letrasUsadas.push(letra);

    let acierto = false;
    this.palabraSecreta.split('').forEach((l, i) => {
      if (l === letra) {
        this.palabraMostrada[i] = letra;
        acierto = true;
      }
    });

    if (!acierto) {
      this.intentos--;
    }

    this.verificarEstado();
  }

  verificarEstado() {
    if (!this.palabraMostrada.includes('_')) {
      this.juegoGanado = true;
      this.juegoTerminado = true;
    } else if (this.intentos <= 0) {
      this.juegoPerdido = true;
      this.juegoTerminado = true;
    }
  }

  reiniciarJuego() {
    this.palabraSecreta = this.elegirPalabraAleatoria();
    this.iniciarJuego(); 
  }


}
