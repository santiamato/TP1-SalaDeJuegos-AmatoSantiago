import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private supabase: SupabaseService) {}

  async login(email: string, password: string): Promise<{ success: boolean; error?: any }> {
    const { error } = await this.supabase.client.auth.signInWithPassword({ email, password });
    return { success: !error, error };
  }

  async registrar(email: string, password: string): Promise<{ success: boolean; error?: any }> {
    const { error } = await this.supabase.client.auth.signUp({ email, password });
    return { success: !error, error };
  }

  ObtenerUsuario() {
    return this.supabase.client.auth.getUser();
  }
}
