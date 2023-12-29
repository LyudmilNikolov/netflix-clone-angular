import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/login/login.component').then(a => a.LoginComponent) },
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(a => a.HomeComponent) },
];
