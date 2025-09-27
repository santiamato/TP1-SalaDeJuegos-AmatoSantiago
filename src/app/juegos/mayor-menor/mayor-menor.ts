import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.html',
  styleUrls: ['./mayor-menor.css'],
  standalone: true,
  imports: [CommonModule, Navbar]
})
export class MayorMenor implements OnInit {
  mazo: number[] = [];
  cartaActual!: number;
  cartaSiguiente!: number;
  puntos = 0;
  juegoTerminado = false;
  mensaje = '';
  mostrarCartaSiguiente = false; 

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.mazo = this.generarMazo();
    this.puntos = 0;
    this.juegoTerminado = false;
    this.mensaje = '';
    this.mostrarCartaSiguiente = false;
    this.cartaActual = this.mazo.shift()!;
  }

  generarMazo(): number[] {
    const mazo = Array.from({ length: 13 }, (_, i) => i + 1);
    return this.shuffleArray([...mazo, ...mazo, ...mazo, ...mazo]); 
  }

  shuffleArray(array: number[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  adivinar(mayor: boolean) {
    if (this.juegoTerminado || this.mostrarCartaSiguiente) return;

    do {
      this.cartaSiguiente = this.mazo.shift()!;
    } while (this.cartaSiguiente === this.cartaActual && this.mazo.length > 0);

    this.mostrarCartaSiguiente = true; 

    const acierto = mayor
      ? this.cartaSiguiente > this.cartaActual
      : this.cartaSiguiente < this.cartaActual;

    if (acierto) {
      this.puntos++;
      this.mensaje = 'Esoo! Queres seguir jugando?';
    } else {
      this.mensaje = `Incorrecto. La carta era ${this.cartaSiguiente}`;
      this.juegoTerminado = true;
    }
  }

  siguienteTurno() {
    if (!this.mostrarCartaSiguiente || this.juegoTerminado) return;

    this.cartaActual = this.cartaSiguiente;

    this.mostrarCartaSiguiente = false;
    this.mensaje = '';
  }


  reiniciarJuego() {
    this.iniciarJuego();
  }
}
