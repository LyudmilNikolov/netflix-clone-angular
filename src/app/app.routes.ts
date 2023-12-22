import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./login/login.component').then(a => a.LoginComponent) },
    { path: 'home', loadComponent: () => import('./home/home.component').then(a => a.HomeComponent) },
];
