import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: 'crear-factura',
        loadComponent: () =>
          import('./crear-factura/crear-factura.component').then(m => m.CrearFacturaComponent)
      },
      {
        path: 'ver-facturas',
        loadComponent: () =>
          import('./ver-facturas/ver-facturas.component').then(m => m.VerFacturasComponent)
      }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
