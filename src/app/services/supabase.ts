import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, AuthChangeEvent, Session } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  client: SupabaseClient;

  constructor() {
    this.client = createClient(
      'https://gyqjtqrbnkpksinxycat.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cWp0cXJibmtwa3Npbnh5Y2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyODQzMjIsImV4cCI6MjA3Mjg2MDMyMn0.vTO3WbkEV1qAJUJMQZfksudpN9cmvaKwKrUGthJ2-_g'
    );
  }

  async getMessages() {
    return this.client
      .from('messages')
      .select('id, content, created_at, user_id')
      .order('created_at', { ascending: true });
  }

  async sendMessage(userId: string, content: string) {
    return this.client
      .from('messages')
      .insert({ user_id: userId, content });
  }

  // subscribirse a nuevos mensajess
  subscribeMessages(callback: (payload: any) => void) {
    return this.client
      .channel('room1')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        callback
      )
      .subscribe();
  }

  // Obtener email de un user_id
  async getUserEmail(userId: string) {
    const { data } = await this.client
      .from('users')  // tabla interna de auth
      .select('email')
      .eq('id', userId)
      .single();
    return data?.email || 'desconocido';
  }

  async getUsuarioActual() {
    const { data, error } = await this.client.auth.getUser();
    if (error) {
      console.error('Error obteniendo usuario actual:', error.message);
      return null;
    }
    return data.user; 
  }

  suscribirseAuth(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    const { data } = this.client.auth.onAuthStateChange(callback);
    return data.subscription; 
  }

  async cerrarSesion() {
    const { error } = await this.client.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error.message);
      throw error;
    }
  }

  async guardarResultado(usuario: string, juego: string, puntaje: number) {
    const { error } = await this.client
      .from('resultados')
      .insert({
        usuario: usuario,
        juego: juego,
        puntaje: puntaje
      });

    if (error) {
      console.error('Error al guardar resultado:', error.message);
      throw error;
    } else {
      console.log('Resultado guardado');
    }
  }

  async obtenerResultados() {
    const { data, error } = await this.client
      .from('resultados')
      .select('*')
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error al trsaer resultados:', error.message);
      throw error;
    }
    return data;
  }

  async guardarEncuesta(params: {
    usuario: string;
    nombre_apellido: string;
    edad: number;
    telefono: string;
    respuesta1: string; 
    respuesta2: boolean; 
    respuesta3: string; 
  }) {
    const { error } = await this.client
      .from('encuestas')
      .insert({
        usuario: params.usuario,
        nombre_apellido: params.nombre_apellido,
        edad: params.edad,
        telefono: params.telefono,
        respuesta1: params.respuesta1,
        respuesta2: params.respuesta2,
        respuesta3: params.respuesta3,
      });

    if (error) {
      console.error('Error al guardar la encuesta:', error.message);
      throw error;
    }
  }
}
