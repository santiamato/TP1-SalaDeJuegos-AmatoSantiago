import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { QuienSoy } from './components/quien-soy/quien-soy';
import { Registro } from './components/registro/registro';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'registro',
        component: Registro
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'quien-soy',
        component: QuienSoy
    }
];
