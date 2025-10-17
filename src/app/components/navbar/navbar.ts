import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from '../../services/supabase';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  user: User | null = null;

  constructor(private router: Router, private supabaseService: SupabaseService) {
    this.checkearUsuario();
    this.cambioAuth();
  }

  

  private async checkearUsuario() {
    const user = await this.supabaseService.getUsuarioActual();
    this.user = user;
  }

  private cambioAuth() {
    this.supabaseService.suscribirseAuth((_event, session) => {
      this.user = session?.user ?? null;
    });
  }

  async logout() {
    await this.supabaseService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
