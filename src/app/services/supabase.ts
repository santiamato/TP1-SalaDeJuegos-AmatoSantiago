import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  client: SupabaseClient;

  constructor() {
    this.client = createClient(
      'https://gyqjtqrbnkpksinxycat.supabase.co',
      'tu-anon-key'
    );
  }

  // traer msj
  async getMessages() {
    return this.client
      .from('messages')
      .select('id, content, created_at, user_id')
      .order('created_at', { ascending: true });
  }

  // enviar mensaje
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
}
