import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

const supabase = createClient('https://gyqjtqrbnkpksinxycat.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cWp0cXJibmtwa3Npbnh5Y2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyODQzMjIsImV4cCI6MjA3Mjg2MDMyMn0.vTO3WbkEV1qAJUJMQZfksudpN9cmvaKwKrUGthJ2-_g')

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async login(email: string, password: string): Promise<{ success: boolean; error?: any }> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { success: !error, error };
  }

  async registrar(email: string, password: string): Promise<{ success: boolean; error?: any }> {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { success: !error, error };
  }

  ObtenerUsuario() {
    return supabase.auth.getUser();
  }

}