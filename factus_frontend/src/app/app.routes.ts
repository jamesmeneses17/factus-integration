import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: 'crear-factura',
        loadComponent: () => import('./facturas/crear-factura/crear-factura.component').then(m => m.CrearFacturaComponent)
      },
      {
        path: 'ver-facturas',
        loadComponent: () => import('./facturas/ver-facturas/ver-facturas.component').then(m => m.VerFacturasComponent)
      }
    ]
  }
  
];
