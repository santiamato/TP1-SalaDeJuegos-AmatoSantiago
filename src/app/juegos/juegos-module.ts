import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing-module';
import { Ahorcado } from './ahorcado/ahorcado';
import { MayorMenor } from './mayor-menor/mayor-menor';
import { Preguntados } from './preguntados/preguntados/preguntados';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JuegoColores } from './juego-colores/juego-colores';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    Ahorcado,
    MayorMenor,
    Preguntados,
    JuegoColores
  ]
})
export class JuegosModule { }
