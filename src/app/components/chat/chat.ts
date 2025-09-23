import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { createClient } from '@supabase/supabase-js';
import { Navbar } from '../navbar/navbar';

const supabase = createClient(
  'https://gyqjtqrbnkpksinxycat.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cWp0cXJibmtwa3Npbnh5Y2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyODQzMjIsImV4cCI6MjA3Mjg2MDMyMn0.vTO3WbkEV1qAJUJMQZfksudpN9cmvaKwKrUGthJ2-_g'
);

interface Mensaje {
  id: number;
  user_id: string;
  user_email: string;
  contenido: string;
  fecha_creacion: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  // Decorador para manejar el scroll del chat automáticamente
  @ViewChild('scrollMe') private contenedorScroll!: ElementRef;

  mensajes: Mensaje[] = [];
  nuevoMensaje = '';
  usuario: any = null;
  suscripcion: any;

  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit() {
    // Devuelve usuarioo autenticado
    const { data: { user } } = await this.authService.ObtenerUsuario();
    this.usuario = user;

    if (!this.usuario?.id) {
      this.router.navigate(['/login']);
      return;
    }

    // traer los mensajes existentes con mail
    const { data: datosMensajes, error } = await supabase
      .from('mensajes_con_email')
      .select('*')
      .order('fecha_creacion', { ascending: true });

    if (error) {
      console.error('Error cargando mensajes:', error);
    } else {
      this.mensajes = datosMensajes || [];
    }

    // suscribirse a nuevos mensajes en tiempo real
    this.suscripcion = supabase
      .channel('public:mensajes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mensajes' },
        async (payload: any) => {
          const { data: nuevoMsg, error } = await supabase
            .from('mensajes_con_email')
            .select('*')
            .eq('id', payload.new.id)
            .single();

          if (!error && nuevoMsg) {
            this.mensajes.push(nuevoMsg);
            this.scrollAbajo();
          }
        }
      )
      .subscribe();
  }

  ngAfterViewChecked() {
    this.scrollAbajo();
  }

  ngOnDestroy() {
    if (this.suscripcion) supabase.removeChannel(this.suscripcion);
  }

  async enviarMensaje() {
    // Si el msj esta vacio, o el user no esta log, no hace nada
    if (!this.nuevoMensaje.trim() || !this.usuario?.id) return;

    try {
      await supabase.from('mensajes').insert({
        user_id: this.usuario.id,
        contenido: this.nuevoMensaje
      });
      this.nuevoMensaje = '';
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
    }
  }

  private scrollAbajo() {
    try {
      this.contenedorScroll.nativeElement.scrollTop =
        this.contenedorScroll.nativeElement.scrollHeight;
    } catch {}
  }

  formatearFecha(fecha: string | null): string {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    });
  }
}
