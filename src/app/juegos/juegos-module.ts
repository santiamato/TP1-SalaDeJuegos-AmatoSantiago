import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing-module';
import { Ahorcado } from './ahorcado/ahorcado';
import { MayorMenor } from './mayor-menor/mayor-menor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    Ahorcado,
    MayorMenor
  ]
})
export class JuegosModule { }
