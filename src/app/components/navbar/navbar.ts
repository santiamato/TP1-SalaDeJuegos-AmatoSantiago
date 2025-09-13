import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { createClient, User } from '@supabase/supabase-js';

const supabase = createClient(
  'https://gyqjtqrbnkpksinxycat.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' 
);

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  user: User | null = null;

  constructor(private router: Router) {
    this.checkearUsuario();
    this.cambioAuth();
  }

  private async checkearUsuario() {
    const { data } = await supabase.auth.getUser();
    this.user = data.user;
  }

  private cambioAuth() {
    supabase.auth.onAuthStateChange((_event, session) => {
      this.user = session?.user ?? null;
    });
  }

  async logout() {
    await supabase.auth.signOut();
    this.router.navigate(['/login']);
  }
}
