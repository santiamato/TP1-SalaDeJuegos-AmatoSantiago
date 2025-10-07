import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ahorcado } from './ahorcado/ahorcado';
import { MayorMenor } from './mayor-menor/mayor-menor';
import { Preguntados } from './preguntados/preguntados/preguntados';
import { JuegoColores } from './juego-colores/juego-colores';

const routes: Routes = [
  { path: 'ahorcado', component: Ahorcado},
  { path: 'mayor-menor', component: MayorMenor },
  { path: 'preguntados', component: Preguntados },
  { path: 'juego-colores', component: JuegoColores },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule {}
