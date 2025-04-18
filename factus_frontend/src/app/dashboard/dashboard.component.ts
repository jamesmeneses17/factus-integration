import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- este es el importante

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule] // <-- aquí agrégalo
})
export class DashboardComponent {
  mostrarSidebar: boolean = false; // oculto por defecto en móviles

}
