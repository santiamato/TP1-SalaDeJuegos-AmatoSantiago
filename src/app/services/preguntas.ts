import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pregunta {
  pregunta: string;
  opciones: string[];
  correcta: string;
  imagen: string;
}

@Injectable({ providedIn: 'root' })
export class ServicioPreguntas {
  private urlBase = 'https://backend-tpsalajuegos-amato-production.up.railway.app/api/pregunta';

  constructor(private http: HttpClient) {}

  obtenerPregunta(): Observable<Pregunta> {
    return this.http.get<Pregunta>(this.urlBase);
  }
}
