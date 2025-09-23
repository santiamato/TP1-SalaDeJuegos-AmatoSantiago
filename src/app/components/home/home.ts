import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { Navbar } from '../navbar/navbar'; 

const supabaseUrl = 'https://gyqjtqrbnkpksinxycat.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const supabase = createClient(supabaseUrl, supabaseKey);

@Component({
  selector: 'app-inicio',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [Navbar] 
})
export class Home implements OnInit {
  usuarioActual: any;

  constructor(private router: Router) {}

  async ngOnInit() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioActual = session.user;
  }

  irAJuego(ruta: string) {
    this.router.navigate([ruta]);
  }
}
