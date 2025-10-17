import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../../services/supabase';
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
  puntaje = 0;

  constructor(private supabaseService: SupabaseService) {} 


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
    this.puntaje = 0;
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
      this.puntaje = Math.max(0, this.intentos);
      this.guardarResultado();
    } else if (this.intentos <= 0) {
      this.juegoPerdido = true;
      this.juegoTerminado = true;
      this.puntaje = 0;
      this.guardarResultado();
    }
  }

  reiniciarJuego() {
    this.palabraSecreta = this.elegirPalabraAleatoria();
    this.iniciarJuego(); 
  }

  async guardarResultado() {
    const user = await this.supabaseService.getUsuarioActual();

    if (!user) {
      console.warn("⚠️ No hay usuario logueado, no se guarda resultado");
      return;
    }

    const email = user.email || "desconocido";

    try {
      await this.supabaseService.guardarResultado(email, 'ahorcado', this.puntaje);
      console.log("✅ Resultado guardado para:", email);
    } catch (error) {
      console.error('❌ Error guardando resultado:', error);
    }
  }



}
